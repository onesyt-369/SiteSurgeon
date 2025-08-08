import { apiRequest } from "./queryClient";
import type { AuditResult } from "@/pages/home";

export interface AuditRequest {
  url: string;
  email: string;
  name?: string;
}

export async function runAudit(data: AuditRequest): Promise<AuditResult> {
  const response = await apiRequest("POST", "/api/audit", data);
  return await response.json();
}
