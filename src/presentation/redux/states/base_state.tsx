import { Failure } from '../../../domain/entities/failure';

export interface WaitingState {
  type?: 'waiting_state';
}

export interface LoadingState {
  type?: 'loading_state';
}

export interface EmptyState {
  type?: 'empty_state';
}

export interface ErrorState {
  type?: 'error_state';
  error: Failure;
}

export type BaseState = WaitingState | LoadingState | EmptyState | ErrorState;
