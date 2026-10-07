export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      categories: {
        Row: {
          company_id: string
          id: string
          is_published: boolean
          name_en: string
          name_pt: string
          slug: string
          sort_order: number
        }
        Insert: {
          company_id: string
          id?: string
          is_published?: boolean
          name_en?: string
          name_pt: string
          slug: string
          sort_order?: number
        }
        Update: {
          company_id?: string
          id?: string
          is_published?: boolean
          name_en?: string
          name_pt?: string
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          accent: string
          area_en: string
          area_pt: string
          banner_url: string | null
          created_at: string
          description_en: string
          description_pt: string
          email: string | null
          id: string
          is_published: boolean
          logo_url: string | null
          name: string
          phone: string | null
          short_name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          accent?: string
          area_en?: string
          area_pt?: string
          banner_url?: string | null
          created_at?: string
          description_en?: string
          description_pt?: string
          email?: string | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name: string
          phone?: string | null
          short_name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          accent?: string
          area_en?: string
          area_pt?: string
          banner_url?: string | null
          created_at?: string
          description_en?: string
          description_pt?: string
          email?: string | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name?: string
          phone?: string | null
          short_name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company_name: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_read: boolean
          message: string
          phone: string | null
          subject: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_read?: boolean
          message: string
          phone?: string | null
          subject: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_read?: boolean
          message?: string
          phone?: string | null
          subject?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string
          id: string
          name: string
          product_id: string
          type: string
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          product_id: string
          type: string
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          product_id?: string
          type?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt_text: string
          id: string
          product_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt_text?: string
          id?: string
          product_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt_text?: string
          id?: string
          product_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_specifications: {
        Row: {
          id: string
          label_en: string
          label_pt: string
          product_id: string
          sort_order: number
          value: string
        }
        Insert: {
          id?: string
          label_en?: string
          label_pt: string
          product_id: string
          sort_order?: number
          value: string
        }
        Update: {
          id?: string
          label_en?: string
          label_pt?: string
          product_id?: string
          sort_order?: number
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_specifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          availability: string | null
          brand: string | null
          category_id: string | null
          company_id: string
          created_at: string
          description_en: string
          description_pt: string
          id: string
          image_url: string | null
          is_featured: boolean
          is_published: boolean
          model: string | null
          name_en: string
          name_pt: string
          sku: string | null
          slug: string
          type: string | null
          updated_at: string
        }
        Insert: {
          availability?: string | null
          brand?: string | null
          category_id?: string | null
          company_id: string
          created_at?: string
          description_en?: string
          description_pt?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          model?: string | null
          name_en?: string
          name_pt: string
          sku?: string | null
          slug: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          availability?: string | null
          brand?: string | null
          category_id?: string | null
          company_id?: string
          created_at?: string
          description_en?: string
          description_pt?: string
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_published?: boolean
          model?: string | null
          name_en?: string
          name_pt?: string
          sku?: string | null
          slug?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_items: {
        Row: {
          company_id: string | null
          id: string
          item_name: string
          product_id: string | null
          quantity: number
          quote_id: string
        }
        Insert: {
          company_id?: string | null
          id?: string
          item_name: string
          product_id?: string | null
          quantity?: number
          quote_id: string
        }
        Update: {
          company_id?: string | null
          id?: string
          item_name?: string
          product_id?: string | null
          quantity?: number
          quote_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          attachment_url: string | null
          company_name: string | null
          country: string | null
          created_at: string
          email: string
          full_name: string
          group_company_id: string | null
          id: string
          job_title: string | null
          message: string | null
          phone: string
          reference: string
          requested_date: string | null
          status: Database["public"]["Enums"]["quote_status"]
        }
        Insert: {
          attachment_url?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          email: string
          full_name: string
          group_company_id?: string | null
          id?: string
          job_title?: string | null
          message?: string | null
          phone: string
          reference: string
          requested_date?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
        }
        Update: {
          attachment_url?: string | null
          company_name?: string | null
          country?: string | null
          created_at?: string
          email?: string
          full_name?: string
          group_company_id?: string | null
          id?: string
          job_title?: string | null
          message?: string | null
          phone?: string
          reference?: string
          requested_date?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
        }
        Relationships: [
          {
            foreignKeyName: "quotes_group_company_id_fkey"
            columns: ["group_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
      quote_status:
        | "novo"
        | "em_analise"
        | "em_negociacao"
        | "cotacao_enviada"
        | "concluido"
        | "cancelado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
      quote_status: [
        "novo",
        "em_analise",
        "em_negociacao",
        "cotacao_enviada",
        "concluido",
        "cancelado",
      ],
    },
  },
} as const
