void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int val = analogRead(A0);
  float voltage = val * (5.0 / 1023.0);
  Serial.println(voltage); 
  delay(2000);
}
