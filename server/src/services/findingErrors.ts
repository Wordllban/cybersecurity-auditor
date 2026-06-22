/**
 * Raised when a finding input references observations that do not exist (or are
 * not the caller's). The route maps this to a 400 with the offending ids so the
 * reviewer gets a clear, actionable message (issue #5 acceptance).
 */
export class FindingValidationError extends Error {
  readonly code = "invalid_observations";
  constructor(
    message: string,
    readonly missingObservationIds: string[]
  ) {
    super(message);
  }
}
