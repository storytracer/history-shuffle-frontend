
import { createClient } from '@supabase/supabase-js'

export default class SupabaseService {
    constructor() {
        this.supabase = createClient("https://rxhvzzinsinnymvhbjzk.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMzY0NzY2OSwiZXhwIjoxOTI5MjIzNjY5fQ.xHfp4Jgq-4m2zzNgfoB3SX8cfQQX3T2vzYSr2szkBtI")
    }

    getInstance() {
        return this.supabase;
    }
}