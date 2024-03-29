export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
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
          ecnum1: string;
          ecnum2: string;
          ecnum3: string | null;
          ecres1: string;
          ecres2: string;
          ecres3: string | null;
          firstname: string;
          grade: number;
          idpicfile: string | null;
          lastname: string;
          lrn: number;
          middlename: string | null;
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
          ecnum1: string;
          ecnum2: string;
          ecnum3?: string | null;
          ecres1?: string;
          ecres2?: string;
          ecres3?: string | null;
          firstname: string;
          grade: number;
          idpicfile?: string | null;
          lastname: string;
          lrn?: number;
          middlename?: string | null;
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
          ecnum1?: string;
          ecnum2?: string;
          ecnum3?: string | null;
          ecres1?: string;
          ecres2?: string;
          ecres3?: string | null;
          firstname?: string;
          grade?: number;
          idpicfile?: string | null;
          lastname?: string;
          lrn?: number;
          middlename?: string | null;
          pwd?: boolean;
          section?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string;
          group: string | null;
          id: string;
          role: string;
        };
        Insert: {
          created_at?: string;
          group?: string | null;
          id?: string;
          role?: string;
        };
        Update: {
          created_at?: string;
          group?: string | null;
          id?: string;
          role?: string;
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
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
