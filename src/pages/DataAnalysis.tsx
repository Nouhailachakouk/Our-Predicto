
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface AnalysisResult {
  id: string;
  model_type: string;
  predictions: any;
  anomalies: any;
  accuracy_score: number;
  created_at: string;
}

interface DataUpload {
  id: string;
  filename: string;
  original_filename: string;
  status: string;
  rows_count: number;
  created_at: string;
}

const DataAnalysis = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploads, setUploads] = useState<DataUpload[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please select a CSV file');
        setFile(null);
      }
    }
  };

  const uploadFile = async () => {
    if (!file || !user) return;

    setUploading(true);
    setError('');

    try {
      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('data-uploads')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Save upload record to database
      const { error: dbError } = await supabase
        .from('data_uploads')
        .insert({
          user_id: user.id,
          filename: fileName,
          original_filename: file.name,
          file_size: file.size,
          status: 'uploaded',
        });

      if (dbError) throw dbError;

      // Refresh uploads list
      loadUploads();
      setFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const runAnalysis = async (uploadId: string, modelType: 'random_forest' | 'isolation_forest') => {
    if (!user) return;

    setAnalyzing(true);
    setError('');

    try {
      // Simulate AI analysis (in real implementation, this would call an edge function)
      const mockResults = {
        random_forest: {
          predictions: [0.95, 0.87, 0.92, 0.76, 0.89],
          accuracy_score: 0.87,
          feature_importance: { temperature: 0.45, vibration: 0.32, pressure: 0.23 }
        },
        isolation_forest: {
          anomalies: [false, false, true, false, false],
          anomaly_score: [-0.1, -0.05, 0.8, -0.03, -0.07],
          outlier_fraction: 0.2
        }
      };

      const resultData = mockResults[modelType];

      // Save analysis results
      const { error } = await supabase
        .from('analysis_results')
        .insert({
          user_id: user.id,
          upload_id: uploadId,
          model_type: modelType,
          predictions: resultData.predictions || null,
          anomalies: resultData.anomalies || null,
          accuracy_score: resultData.accuracy_score || null,
        });

      if (error) throw error;

      loadResults();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const loadUploads = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('data_uploads')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading uploads:', error);
    } else {
      setUploads(data || []);
    }
  }, [user]);

  const loadResults = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('analysis_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading results:', error);
    } else {
      setResults(data || []);
    }
  }, [user]);

  React.useEffect(() => {
    if (user) {
      loadUploads();
      loadResults();
    }
  }, [user, loadUploads, loadResults]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Data Analysis</h1>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload CSV Data</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload your sensor data in CSV format for AI analysis
            </p>
          </div>
          
          {file && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm">{file.name}</span>
                <Badge variant="secondary">{(file.size / 1024).toFixed(1)} KB</Badge>
              </div>
              <Button onClick={uploadFile} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Uploaded Files</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {uploads.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No files uploaded yet</p>
          ) : (
            <div className="space-y-3">
              {uploads.map((upload) => (
                <div key={upload.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{upload.original_filename}</h3>
                      <p className="text-sm text-gray-500">
                        Uploaded {new Date(upload.created_at).toLocaleDateString()}
                        {upload.rows_count && ` • ${upload.rows_count} rows`}
                      </p>
                    </div>
                    <Badge variant={upload.status === 'processed' ? 'default' : 'secondary'}>
                      {upload.status}
                    </Badge>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runAnalysis(upload.id, 'random_forest')}
                      disabled={analyzing}
                    >
                      <Brain className="h-4 w-4 mr-1" />
                      Random Forest
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => runAnalysis(upload.id, 'isolation_forest')}
                      disabled={analyzing}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Isolation Forest
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No analysis results yet</p>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div key={result.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium capitalize">{result.model_type.replace('_', ' ')}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(result.created_at).toLocaleString()}
                      </p>
                    </div>
                    {result.accuracy_score && (
                      <Badge variant="default">
                        Accuracy: {(result.accuracy_score * 100).toFixed(1)}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="text-sm space-y-2">
                    {result.predictions && (
                      <div>
                        <strong>Predictions:</strong> {JSON.stringify(result.predictions).slice(0, 100)}...
                      </div>
                    )}
                    {result.anomalies && (
                      <div>
                        <strong>Anomalies Detected:</strong> {JSON.stringify(result.anomalies).slice(0, 100)}...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalysis;
