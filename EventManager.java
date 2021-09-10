import java.util.ArrayList;
import java.util.List;
// A classe publicadora base inclui o código de gerenciamento de
// inscrições e os métodos de notificação.
public class EventManager {

	/**
	 * ArrayList de arrays com Incidente e usuário inscrito
	 */
	private ArrayList<int[]> listeners = new ArrayList<int[]>();

	//método para inscrição de notificações
	public void subscribe(int incidenteId, int userId) {
		ArrayList<Integer> listener = new ArrayList<Integer>();
		listener.add(incidenteId);
		listener.add(userId);
		listeners.add(listener);
	}
	//método para desinscrição de notificações
	public void unsubscribe(int incidenteId, int solicitanteId) {
		ArrayList<Integer> listener = new ArrayList<Integer>();
		listener.add(incidenteId);
		listener.add(userId);
		listeners.remove(listener);
	}
	//método para notificar os inscritos
	public void notify(int status, int incidenteId) {
		for (ArrayList<int[]> listener : listeners){
			if (listener.get(0) == incidenteId){
				listener.update(status);
			}
		}
	}

}
