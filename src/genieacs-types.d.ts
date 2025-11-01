/**
 * GenieACS Sandbox API Type Declarations
 * For writing provision scripts with TypeScript support
 */

/**
 * Parameter wrapper for interacting with device parameters
 */
interface ParameterWrapper extends Iterable<ParameterWrapper> {
  /** The full path of the parameter */
  readonly path: string | undefined;

  /** Number of parameters matching the path pattern */
  readonly size: number | undefined;

  /** Parameter value attribute */
  readonly value: any;

  /** Parameter type attribute */
  readonly type: string | undefined;

  /** Parameter writable attribute */
  readonly writable: boolean | undefined;

  /** Parameter object attribute (indicates if parameter is an object) */
  readonly object: boolean | undefined;

  /** Notification attribute */
  readonly notification: number | undefined;

  /** Access list attribute */
  readonly accessList: string | undefined;

  /** Iterator for matching parameters */
  [Symbol.iterator](): Iterator<ParameterWrapper>;
}

/**
 * Declare parameters to get or set
 * @param path - Parameter path (supports wildcards: *, and aliases: [alias])
 * @param timestamps - Object specifying minimum timestamps for attributes
 * @param values - Object specifying values to set for attributes
 * @returns ParameterWrapper for accessing parameter data
 */
declare function declare(
  path: string,
  timestamps?: { [attribute: string]: number | string },
  values?: { [attribute: string]: any }
): ParameterWrapper;

/**
 * Clear/delete parameters from the device data model
 * @param path - Parameter path to clear
 * @param timestamp - Timestamp for the clear operation
 * @param attributes - Optional array of specific attributes to clear
 */
declare function clear(
  path: string,
  timestamp: number,
  attributes?: string[]
): void;

/**
 * Commit pending declarations and advance to next revision
 * Call this to execute declared operations
 */
declare function commit(): void;

/**
 * Execute an extension
 * @param args - Extension name followed by arguments
 * @returns Extension return value
 */
declare function ext(...args: unknown[]): any;

/**
 * Log a message (visible in GenieACS access logs)
 * @param message - Log message
 * @param meta - Additional metadata to include
 */
declare function log(message: string, meta?: Record<string, unknown>): void;

/**
 * Sandbox Date constructor
 * Returns current session timestamp when called without arguments
 */
interface DateConstructor {
  new(): Date;
  new(value: number | string): Date;
  new(
    year: number,
    month: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): Date;

  /**
   * Get current timestamp, optionally with scheduling
   * @param intervalOrCron - Interval in ms or cron expression
   * @param variance - Variance in ms for load distribution
   * @returns Timestamp
   */
  now(intervalOrCron?: number | string, variance?: number): number;

  parse(dateString: string): number;
  UTC(
    year: number,
    month?: number,
    date?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    ms?: number
  ): number;
}

interface Date {
  // Instance methods
  getTime(): number;
  getFullYear(): number;
  getMonth(): number;
  getDate(): number;
  getDay(): number;
  getHours(): number;
  getMinutes(): number;
  getSeconds(): number;
  getMilliseconds(): number;
  toISOString(): string;
  toJSON(): string;
  toString(): string;
  toDateString(): string;
  toTimeString(): string;
  toLocaleString(): string;
  toLocaleDateString(): string;
  toLocaleTimeString(): string;
  valueOf(): number;
}

/**
 * Deterministic random number generator
 * Seeded with device ID by default
 */
declare namespace Math {
  /**
   * Returns a pseudo-random number between 0 and 1
   * Deterministic based on device ID
   */
  function random(): number;
}

// Common globals that might be available
declare const args: any[];