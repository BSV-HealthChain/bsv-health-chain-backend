export class HealthDataService {
  static async storeFHIR(payload: any) {
    return {
      status: "stored",
      received_at: Date.now(),
      payload
    };
  }
}
