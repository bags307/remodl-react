import { analytics } from './firebase';
import { logEvent as firebaseLogEvent } from 'firebase/analytics';

export function logEvent(eventName: string, eventParams?: Record<string, any>) {
  if (analytics) {
    firebaseLogEvent(analytics, eventName, eventParams);
  }
}

export function logPageView(pageName: string) {
  logEvent('page_view', { page_name: pageName });
}

export function logUserAction(action: string, details?: Record<string, any>) {
  logEvent('user_action', { action, ...details });
}

export function logError(error: Error, context?: Record<string, any>) {
  logEvent('error', {
    error_name: error.name,
    error_message: error.message,
    ...context,
  });
}