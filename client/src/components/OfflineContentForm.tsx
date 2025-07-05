import React, { useState } from 'react';
import { api } from '../api/client';
import type { OfflineContentRequest, OfflineContentResponse } from '../api/client';

const OfflineContentForm: React.FC = () => {
  const [formData, setFormData] = useState<OfflineContentRequest>({
    content: '',
    contentType: 'text',
    priority: 'medium',
    context: {
      deviceType: 'mobile',
      storageAvailable: 100,
    },
  });

  const [response, setResponse] = useState<OfflineContentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await api.generateOfflineContent(formData);
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
      <h2>Generate Offline Content</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Enter content to make available offline..."
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
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => handleInputChange('priority', e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
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
          <label htmlFor="storageAvailable">Storage Available (MB):</label>
          <input
            type="number"
            id="storageAvailable"
            value={formData.context.storageAvailable}
            onChange={(e) => handleContextChange('storageAvailable', parseInt(e.target.value))}
            min="1"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Offline Content'}
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
          <h3>Generated Offline Content:</h3>
          <div className="response-content">
            <p><strong>Content:</strong> {response.offlineContent}</p>
            <p><strong>Sync Required:</strong> {response.syncRequired ? 'Yes' : 'No'}</p>
            <p><strong>Storage Size:</strong> {response.storageSize} MB</p>
            <p><strong>Priority:</strong> {response.priority}</p>
            <p><strong>Model Version:</strong> {response.metadata.modelVersion}</p>
            <p><strong>Generation Time:</strong> {response.metadata.generationTime}ms</p>
            <p><strong>Confidence:</strong> {(response.metadata.confidence * 100).toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineContentForm; 