export class OverlayService {
    static async lookupIndexedUTXO(txid) {
        return {
            overlayIndexed: true,
            txid,
            metadata: {
                owner: "provider-node",
                encryption: "AES256",
                access: "restricted"
            }
        };
    }
}
