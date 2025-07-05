import React, { useState } from 'react';
import { api } from '../api/client';
import type { CompressContentRequest, CompressContentResponse } from '../api/client';

const CompressContentForm: React.FC = () => {
  const [formData, setFormData] = useState<CompressContentRequest>({
    content: '',
    contentType: 'text',
    bandwidth: 'medium',
    context: {
      deviceType: 'mobile',
      connectionType: 'wifi',
    },
  });

  const [response, setResponse] = useState<CompressContentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await api.compressContent(formData);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContextChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      context: {
        ...prev.context,
        [field]: value,
      },
    }));
  };

  return (
    <div className="form-container">
      <h2>Compress Content for Low Bandwidth</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Enter content to compress..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contentType">Content Type:</label>
          <select
            id="contentType"
            value={formData.contentType}
            onChange={(e) => handleInputChange('contentType', e.target.value)}
          >
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="interactive">Interactive</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bandwidth">Bandwidth:</label>
          <select
            id="bandwidth"
            value={formData.bandwidth}
            onChange={(e) => handleInputChange('bandwidth', e.target.value)}
          >
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deviceType">Device Type:</label>
          <select
            id="deviceType"
            value={formData.context.deviceType}
            onChange={(e) => handleContextChange('deviceType', e.target.value)}
          >
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="connectionType">Connection Type:</label>
          <select
            id="connectionType"
            value={formData.context.connectionType}
            onChange={(e) => handleContextChange('connectionType', e.target.value)}
          >
            <option value="wifi">WiFi</option>
            <option value="mobile">Mobile</option>
            <option value="satellite">Satellite</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Compressing...' : 'Compress Content'}
        </button>
      </form>

      {error && (
        <div className="error">
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}

      {response && (
        <div className="response">
          <h3>Compressed Content:</h3>
          <div className="response-content">
            <p><strong>Compressed Content:</strong> {response.compressedContent}</p>
            <p><strong>Original Size:</strong> {response.originalSize} KB</p>
            <p><strong>Compressed Size:</strong> {response.compressedSize} KB</p>
            <p><strong>Compression Ratio:</strong> {(response.compressionRatio * 100).toFixed(1)}%</p>
            <p><strong>Quality:</strong> {response.quality}</p>
            <p><strong>Model Version:</strong> {response.metadata.modelVersion}</p>
            <p><strong>Generation Time:</strong> {response.metadata.generationTime}ms</p>
            <p><strong>Confidence:</strong> {(response.metadata.confidence * 100).toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressContentForm; 