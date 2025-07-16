import { CohereClient } from "cohere-ai";
const apiKey=import .meta.env.VITE_APIKEY
interface QueueItem {
  query: string;
  resolve: (value: string) => void;
  reject: (reason: string) => void;
}

export class CohereAssistant {
  private cohere: CohereClient;
  private rateLimitWindow: number = 60 * 1000; // 1 minute in ms
  private maxRequestsPerMinute: number = 20; // Trial key limit
  private requestTimestamps: number[] = [];
  private requestQueue: QueueItem[] = []; // Fixed: Changed QueueCordova to QueueItem[]
  private isProcessing: boolean = false;

  constructor() {
    this.cohere = new CohereClient({ token: apiKey });
  }

  private async checkRateLimit(): Promise<boolean> {
    const now = Date.now();
    this.requestTimestamps = this.requestTimestamps.filter(
      (ts) => now - ts < this.rateLimitWindow
    );
    if (this.requestTimestamps.length < this.maxRequestsPerMinute) {
      this.requestTimestamps.push(now);
      return true;
    }
    return false;
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.requestQueue.length === 0) return;
    this.isProcessing = true;

    const canProceed = await this.checkRateLimit();
    if (canProceed) {
      const { query, resolve, reject } = this.requestQueue.shift()!;
      await this.makeApiCall(query, resolve, reject);
    } else {
      setTimeout(() => this.processQueue(), 1000);
    }
  }

  private async makeApiCall(
    query: string,
    resolve: (value: string) => void,
    reject: (reason: string) => void
  ): Promise<void> {
    try {
      const response = await this.cohere.chat({
        model: "command-r-plus-08-2024",
        message: query,
        temperature: 0.7,
        maxTokens: 200,
      });
      resolve(response.text);
    } catch (error: any) {
      let errorMessage = "An error occurred while contacting Cohere.";
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "Invalid request. Please check your query.";
            break;
          case 401:
            errorMessage = "Invalid API key. Please check your credentials.";
            break;
          case 429:
            errorMessage = "Rate limit exceeded. Please try again later.";
            break;
          default:
            errorMessage = `Error ${error.response.status}: ${error.message}`;
        }
      }
      reject(errorMessage);
    } finally {
      this.isProcessing = false;
      await this.processQueue();
    }
  }

  public async sendWeatherQuery(query: string): Promise<string> {
    return new Promise((resolve: (value: string) => void, reject: (reason: string) => void) => {
      this.requestQueue.push({ query, resolve, reject });
      this.processQueue();
    }); // Fixed: Changed 'have' to 'resolve' with correct typing
  }
}