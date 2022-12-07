from alertmanager import Alert
from alertmanager import AlertManager
import json
import traceback


a_manager = AlertManager(host='http://127.0.0.1')


def TryAlert(func):
    def wrapper(*args, **kwargs):
        try:
            func(*args, **kwargs)
        except Exception as e:
            trace = traceback.format_exc()
            short = str(e)
            data = {
                "labels": {
                    "alertname": "PlanetVizWorker",
                    "instance": "PlanetVizWorker",
                },
                "annotations": {
                    "description": "TryAlert",
                    "exception": short,
                    "traceback": trace
                }
            }
            alert = Alert.from_dict(data)
            a_manager.post_alerts(alert)
    return wrapper


@TryAlert
def test():
    return 1//0


test()
