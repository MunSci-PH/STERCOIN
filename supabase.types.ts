export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      sections: {
        Row: {
          grade: number | null;
          sectionName: string | null;
        };
        Insert: {
          grade?: number | null;
          sectionName?: string | null;
        };
        Update: {
          grade?: number | null;
          sectionName?: string | null;
        };
        Relationships: [];
      };
      studentData: {
        Row: {
          address: string | null;
          birthday: string;
          created_at: string;
          ecfb1: string;
          ecfb2: string;
          ecfb3: string | null;
          ecname1: string;
          ecname2: string;
          ecname3: string | null;
          ecnum1: number;
          ecnum2: number;
          ecnum3: number | null;
          firstname: string;
          grade: number;
          lastname: string;
          lrn: number;
          middlename: string;
          pwd: boolean;
          section: string;
        };
        Insert: {
          address?: string | null;
          birthday: string;
          created_at?: string;
          ecfb1: string;
          ecfb2: string;
          ecfb3?: string | null;
          ecname1: string;
          ecname2: string;
          ecname3?: string | null;
          ecnum1: number;
          ecnum2: number;
          ecnum3?: number | null;
          firstname: string;
          grade: number;
          lastname: string;
          lrn?: number;
          middlename: string;
          pwd?: boolean;
          section: string;
        };
        Update: {
          address?: string | null;
          birthday?: string;
          created_at?: string;
          ecfb1?: string;
          ecfb2?: string;
          ecfb3?: string | null;
          ecname1?: string;
          ecname2?: string;
          ecname3?: string | null;
          ecnum1?: number;
          ecnum2?: number;
          ecnum3?: number | null;
          firstname?: string;
          grade?: number;
          lastname?: string;
          lrn?: number;
          middlename?: string;
          pwd?: boolean;
          section?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
