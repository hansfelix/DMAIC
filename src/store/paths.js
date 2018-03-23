// dmaic-b6e44
//
// ├── procesos
// │   └── { proyecto_uid }
// │      └── { proceso_uid }
// │         ├── ...
// │         └── mediciones
// │            └── { mediciones_uid } <=========
// └── ...
export function path_medicion_deproceso(payload) {
  return "procesos/" + payload.proyecto_uid + "/" + payload.proceso_uid + "/mediciones/"
}

// dmaic-b6e44
//
// ├── mediciones
// │   └── { proyecto_uid }
// │      └── { proceso_uid }
// │         └── { medicion_uid } <=========
// └── ...
export function path_medicion(payload) {
  return "medicion/" + payload.proyecto_uid + "/" + payload.proceso_uid
}
