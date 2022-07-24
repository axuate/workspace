jest.mock('@axuate/reflection', () => ({
  Metadata: jest.fn().mockReturnValue(jest.fn()),
  getMetadata: jest.fn(),
  Method: jest.fn().mockReturnValue(jest.fn()),
  Property: jest.fn().mockReturnValue(jest.fn())
}));
