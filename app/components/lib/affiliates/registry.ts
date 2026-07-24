import { merchants } from "./merchants";

export function getMerchantByUrl(url: string) {

    const lower = url.toLowerCase();

    return merchants.find((merchant) =>

        merchant.domains.some(domain =>
            lower.includes(domain.toLowerCase())
        )

    );

}