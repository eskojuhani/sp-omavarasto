#SCHEMA

ALTER TABLE Tuoteloki DROP CONSTRAINT Tuoteloki_pmkey;

DROP TABLE dbo.Varasto;
DROP TABLE dbo.TuoteLoki;
DROP TABLE dbo.Tuote;
DROP TABLE dbo.Yksikko;
DROP TABLE dbo.Kayttaja;
DROP TABLE dbo.Organisaatio;

CREATE TABLE Organisaatio (
  Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  Tunnus NVARCHAR(40) NOT NULL,
  Nimi NVARCHAR(40) NOT NULL
);

CREATE TABLE Kayttaja (
  Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  OrganisaatioId INT REFERENCES Organisaatio(Id) NOT NULL,
  Tunnus NVARCHAR(40) NOT NULL,
  Nimi NVARCHAR(40) NOT NULL
);

CREATE TABLE Varasto (
  Id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
  OrganisaatioId INT REFERENCES Organisaatio(Id) NOT NULL,
  Nimi NVARCHAR(40) NOT NULL
);

CREATE TABLE Tuote (
  Id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  VarastoId INT REFERENCES Varasto(Id) NOT NULL,
  Snro INT NULL,
  Tuotenimi NVARCHAR(40) NOT NULL,
  Lajimerkki NVARCHAR(40) NULL,
  Era NVARCHAR(40) NULL,
  Yksikko NVARCHAR(20) NULL,
  Saldo NUMERIC(15, 2) NULL DEFAULT 0,
  Huomio NVARCHAR(40) NULL,
  Viite NVARCHAR(40) NULL,
  Tyo NVARCHAR(40) NULL,
  Luontipvm DATETIME DEFAULT GETDATE() NOT NULL,
  Muutospvm DATETIME NULL,
  Poistopvm DATETIME NULL 
);

CREATE TABLE TuoteLoki (
  Id INT NOT NULL IDENTITY(1,1),
  TuoteId INT REFERENCES Tuote(Id) NOT NULL,
  VarastoId INT REFERENCES Varasto(Id) NOT NULL,
  KayttajaId INT REFERENCES Kayttaja(Id) NOT NULL,
  Snro INT NULL,
  Tuotenimi NVARCHAR(40) NOT NULL,
  Lajimerkki NVARCHAR(40) NULL,
  Era NVARCHAR(40) NULL,
  Yksikko NVARCHAR(10) NULL,
  Saldo NUMERIC(15, 2) NULL DEFAULT 0,
  Saapuminen NUMERIC(15, 2) NULL DEFAULT 0,
  Ottaminen NUMERIC(15, 2) NULL DEFAULT 0,
  Huomio NVARCHAR(40) NULL,
  Viite NVARCHAR(40) NULL,
  Tyo NVARCHAR(40) NULL,
  Toimenpide NVARCHAR(40) NULL,
  Paivays DATETIME DEFAULT GETDATE() NOT NULL
);
ALTER TABLE TuoteLoki
ADD CONSTRAINT TuoteLoki_pmkey
PRIMARY KEY (Id, TuoteId, VarastoId);

SET IDENTITY_INSERT TuoteLoki ON;

CREATE TABLE Yksikko (
  Id INT PRIMARY KEY NOT NULL IDENTITY(1,1),
  Nimi NVARCHAR(10) NOT NULL
);

INSERT INTO Yksikko VALUES ('H');
INSERT INTO Yksikko VALUES ('KG');
INSERT INTO Yksikko VALUES ('KPL');
INSERT INTO Yksikko VALUES ('M');
INSERT INTO Yksikko VALUES ('PAA');
INSERT INTO Yksikko VALUES ('PAR');
INSERT INTO Yksikko VALUES ('PS');
INSERT INTO Yksikko VALUES ('RL');
INSERT INTO Yksikko VALUES ('SET');
INSERT INTO Yksikko VALUES ('SRJ');


curl \
 -H 'Content-Type: application/json' \
 -H 'Accept: application/json' \
 -d '{AsiakasId: "1", Nimi: "Vantaa"}' \
 -X POST http://localhost:7071/api/varasto


curl \
 -H 'Content-Type: application/json' \
 -H 'Accept: application/json' \
 -d '{order: 1, title: "alfa", url:"https://e.ee", completed: 0}' \
 -X POST  https://swa-with-api.azurewebsites.net/api/todo
 
  https://green-flower-0a43ece03.4.azurestaticapps.net/api/httpTrigger1


  curl \
 -H 'Content-Type: application/json' \
 -H 'Accept: application/json' \
 -X GET  https://swa-with-api.azurewebsites.net/api/todo


 curl -X POST  https://green-flower-0a43ece03.4.azurestaticapps.net/api/httpTrigger1 -d'{order: 1, title: "alfa", url:"https://e.ee", completed: 0}'