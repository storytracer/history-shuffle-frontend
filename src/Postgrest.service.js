
import { PostgrestClient } from '@supabase/postgrest-js'

export default class PostgrestService {
    constructor() {
        this.postgrest = new PostgrestClient('https://api-shuffle.tempopedia.org')
    }

    getInstance() {
        return this.postgrest;
    }
}