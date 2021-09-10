

public class EnviaEmail implements Listeners {

	private String email;

	//Quando este método é chamado ele alerta que o status
	//do incidente foi alterado então ele chama o método enviar
	//para enviar o email.
	public void update(int status) {
		enviar(status);
	}

	public void enviar(int status) {

	}

}
