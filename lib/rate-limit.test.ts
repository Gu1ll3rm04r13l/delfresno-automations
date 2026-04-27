import { describe, it, expect } from "vitest";
import { hashIp, getClientIp } from "./rate-limit";

describe("hashIp", () => {
  it("produce hash determinístico para misma IP+salt", () => {
    const a = hashIp("1.2.3.4", "salt");
    const b = hashIp("1.2.3.4", "salt");
    expect(a).toBe(b);
  });

  it("cambia con distinto salt", () => {
    const a = hashIp("1.2.3.4", "salt-a");
    const b = hashIp("1.2.3.4", "salt-b");
    expect(a).not.toBe(b);
  });

  it("cambia con distinta IP", () => {
    const a = hashIp("1.2.3.4", "salt");
    const b = hashIp("5.6.7.8", "salt");
    expect(a).not.toBe(b);
  });

  it("no contiene la IP cruda en el hash", () => {
    const ip = "1.2.3.4";
    const h = hashIp(ip, "salt");
    expect(h).not.toContain(ip);
  });
});

describe("getClientIp", () => {
  it("toma primera IP de x-forwarded-for", () => {
    const h = new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" });
    expect(getClientIp(h)).toBe("1.1.1.1");
  });

  it("usa x-real-ip si no hay xff", () => {
    const h = new Headers({ "x-real-ip": "3.3.3.3" });
    expect(getClientIp(h)).toBe("3.3.3.3");
  });

  it("default 0.0.0.0 si no hay headers", () => {
    expect(getClientIp(new Headers())).toBe("0.0.0.0");
  });
});
