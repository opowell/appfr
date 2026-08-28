import type { DomainSchema, EntitySchema } from '../types';
/** Present in every schema: the shell's own configuration, as records. */
export declare const settingsEntity: EntitySchema;
/** Present in every schema: the shell's own audit trail. */
export declare const logsEntity: EntitySchema;
export declare const iRadarSchema: DomainSchema;
export declare const legoSchema: DomainSchema;
export declare const commerceSchema: DomainSchema;
export declare const battleSimSchema: DomainSchema;
/** Every bundled schema, keyed by its `key`. */
export declare const schemas: {
    iRadar: DomainSchema;
    LEGO: DomainSchema;
    Commerce: DomainSchema;
    'Battle-sim': DomainSchema;
};
export type SchemaKey = keyof typeof schemas;
export declare const schemaList: DomainSchema[];
