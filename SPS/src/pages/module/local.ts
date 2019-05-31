export class Local{
  public nome: string;
  public horario: string;
  public latitude: number;
  public longitude: number;

  local(nome, horario, latitute, longitude){
    this.nome = nome;
    this.horario = horario;
    this.latitude = latitute;
    this.longitude = longitude;
  }
}