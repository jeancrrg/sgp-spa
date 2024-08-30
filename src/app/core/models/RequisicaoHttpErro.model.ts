import { HttpErrorResponse } from "@angular/common/http";

export class RequisicaoHttpErro extends HttpErrorResponse {
    override error: string;
    override message: string;
    path: string;
    override status: number;
    timestamp: string;
}
