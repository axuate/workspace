import type { SegmentNode } from './SegmentNode';

export type RouteGraph<T> = Record<string, SegmentNode<T>>;
