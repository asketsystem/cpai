import React, { useState } from 'react';
import { api } from '../api/client';
import type { AdaptContentRequest, AdaptContentResponse } from '../api/client';

const AdaptContentForm: React.FC = () => {
  const [formData, setFormData] = useState<AdaptContentRequest>({
    userId: '',
    content: '',
    userBehavior: {
      attentionSpan: 20,
      completionRate: 60,
      interactionFrequency: 5,
      preferredFormat: 'text',
      learningPace: 'medium',
    },
    context: {
      deviceType: 'mobile',
      sessionDuration: 30,
      timeOfDay: 'morning',
    },
  });

  const [response, setResponse] = useState<AdaptContentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const result = await api.adaptContent(formData);
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

  const handleBehaviorChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      userBehavior: {
        ...prev.userBehavior,
        [field]: value,
      },
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
      <h2>Adapt Content Based on User Behavior</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            value={formData.userId}
            onChange={(e) => handleInputChange('userId', e.target.value)}
            placeholder="Enter user ID..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Enter content to adapt..."
            required
          />
        </div>

        <div className="form-section">
          <h3>User Behavior</h3>
          
          <div className="form-group">
            <label htmlFor="attentionSpan">Attention Span (minutes):</label>
            <input
              type="number"
              id="attentionSpan"
              value={formData.userBehavior.attentionSpan}
              onChange={(e) => handleBehaviorChange('attentionSpan', parseInt(e.target.value))}
              min="1"
              max="120"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="completionRate">Completion Rate (%):</label>
            <input
              type="number"
              id="completionRate"
              value={formData.userBehavior.completionRate}
              onChange={(e) => handleBehaviorChange('completionRate', parseInt(e.target.value))}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="interactionFrequency">Interaction Frequency:</label>
            <input
              type="number"
              id="interactionFrequency"
              value={formData.userBehavior.interactionFrequency}
              onChange={(e) => handleBehaviorChange('interactionFrequency', parseInt(e.target.value))}
              min="1"
              max="50"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferredFormat">Preferred Format:</label>
            <select
              id="preferredFormat"
              value={formData.userBehavior.preferredFormat}
              onChange={(e) => handleBehaviorChange('preferredFormat', e.target.value)}
            >
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="learningPace">Learning Pace:</label>
            <select
              id="learningPace"
              value={formData.userBehavior.learningPace}
              onChange={(e) => handleBehaviorChange('learningPace', e.target.value)}
            >
              <option value="slow">Slow</option>
              <option value="medium">Medium</option>
              <option value="fast">Fast</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Context</h3>
          
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
            <label htmlFor="sessionDuration">Session Duration (minutes):</label>
            <input
              type="number"
              id="sessionDuration"
              value={formData.context.sessionDuration}
              onChange={(e) => handleContextChange('sessionDuration', parseInt(e.target.value))}
              min="1"
              max="480"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeOfDay">Time of Day:</label>
            <select
              id="timeOfDay"
              value={formData.context.timeOfDay}
              onChange={(e) => handleContextChange('timeOfDay', e.target.value)}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adapting...' : 'Adapt Content'}
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
          <h3>Adapted Content:</h3>
          <div className="response-content">
            <p><strong>Adapted Content:</strong> {response.adaptedContent}</p>
            
            <div className="adaptations">
              <h4>Adaptations:</h4>
              <p><strong>Pacing:</strong> {response.adaptations.pacing}</p>
              <p><strong>Format:</strong> {response.adaptations.format}</p>
              <p><strong>Complexity:</strong> {response.adaptations.complexity}</p>
              <p><strong>Engagement:</strong> {response.adaptations.engagement}</p>
            </div>

            {response.recommendations.length > 0 && (
              <div className="recommendations">
                <h4>Recommendations:</h4>
                <ul>
                  {response.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            <p><strong>Model Version:</strong> {response.metadata.modelVersion}</p>
            <p><strong>Generation Time:</strong> {response.metadata.generationTime}ms</p>
            <p><strong>Confidence:</strong> {(response.metadata.confidence * 100).toFixed(1)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdaptContentForm; 