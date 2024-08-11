
package br.com.ufape.agiota.exceptions;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class PagamentoInvalidoException  extends RuntimeException{
	private static final long serialVersionUID = 1L;

	public PagamentoInvalidoException(String mensagem) {
        super(mensagem);
    }

}
