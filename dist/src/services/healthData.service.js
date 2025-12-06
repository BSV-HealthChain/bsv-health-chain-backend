export class HealthDataService {
    static async storeFHIR(payload) {
        return {
            status: "stored",
            received_at: Date.now(),
            payload
        };
    }
}
