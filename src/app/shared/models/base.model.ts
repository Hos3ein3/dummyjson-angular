export interface BaseEntity {
  id: string;
}

export interface AuditFields {
  createdAtUtc: string;
  modifiedAtUtc: string | null;
  createdByUserId: string;
  modifiedByUserId: string | null;
}
