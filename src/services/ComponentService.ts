// services/PatientService.ts
import { AppDataSource } from "../data-source";
import { Patient } from "../entity/Patient.entity";
import { PatientDetail } from "../entity/PatientDetail.entity";
import { PatientReferralData } from "../entity/PatientReferralData.entity";
import { PatientVisitIGD } from "../entity/PatientVisitIGDData.entity";
import { ValueBelief } from "../entity/ValueBelief.entity";
import { HealthInformationPatient } from "../entity/HealthInformationPatient.entity";
import { PrivacyRequest } from "../entity/PrivacyRequest.entity";
import { PatientVisitData } from "../entity/PatientVisitData.entity";
import { SepData } from "../entity/SepData.entity";
import { DocumentPatient } from "../entity/DocumentPatient.entity";
import { InpatientRecord } from "../entity/InpatientRecord.entity";
import { ResponsiblePerson } from "../entity/ResponsiblePerson.entity";
import { Simulation } from "../entity/Simulation.entity";

export interface CreatePatientInput {
  patient: any;
  patient_detail?: any;
  value_belief?: { value_belief: string };
  privacy_request?: { privacy_request: string };
  family_members?: Array<{ name: string; family_relationship: string; phone_number: string }>;
}

export interface CreateAdmissionOutPatientInput {
  simulation_id: number;
  visit: PatientVisitData;
  referral: PatientReferralData;
  sep: SepData;
  document: DocumentPatient
}

export interface CreateAdmissionInPatientInput {
  simulation_id: number;
  inpatientRecord: Partial<InpatientRecord>;
  responsiblePerson: Partial<ResponsiblePerson>;
  healthInformation?: Partial<HealthInformationPatient>;
  valueBelief?: Partial<ValueBelief>;
  privacyRequest?: Partial<PrivacyRequest>;
  documentPatient?: Partial<DocumentPatient>;
}

export interface CreateAdmissionIGDPatientInput {
  simulation_id: number;
  visitIGD: Partial<PatientVisitIGD>;
  document: Partial<DocumentPatient>;
}

export class ComponentService {
  static async createPatient(data: CreatePatientInput) {
    const {
      patient,
      patient_detail,
      value_belief,
      privacy_request,
      family_members,
    } = data;

    const patientRepo = AppDataSource.getRepository(Patient);
    const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
    const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
    const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
    const healthInfoRepo = AppDataSource.getRepository(HealthInformationPatient);

    const existing = await patientRepo.findOneBy({ simulation_id: patient.simulation_id });
    if (existing) {
      throw new Error("Simulation already has a patient.");
    }

    const newPatient = patientRepo.create(patient);
    const savedPatient = await patientRepo.save(newPatient);
    const existingPatient = await patientRepo.findOneBy({ simulation_id: patient.simulation_id });

    if (patient_detail) {
      const newPatientDetail = patientDetailRepo.create({
        ...patient_detail,
        patient_id: existingPatient.id,
      });
      await patientDetailRepo.save(newPatientDetail);
    }

    if (value_belief?.value_belief) {
      const newVB = valueBeliefRepo.create({
        patient_id: existingPatient.id,
        value_belief: value_belief.value_belief,
      });
      await valueBeliefRepo.save(newVB);
    }

    if (privacy_request?.privacy_request) {
      const newPR = privacyRequestRepo.create({
        patient_id: existingPatient.id,
        privacy_request: privacy_request.privacy_request,
      });
      await privacyRequestRepo.save(newPR);
    }

    if (Array.isArray(family_members)) {
      for (const fm of family_members) {
        if (fm.name) {
          const newFM = healthInfoRepo.create({
            patient_id: existingPatient.id,
            name: fm.name,
            family_relationship: fm.family_relationship,
            phone_number: fm.phone_number,
          });
          await healthInfoRepo.save(newFM);
        }
      }
    }

    return savedPatient;
  }

  static async createAdmissionOutPatient(data: CreateAdmissionOutPatientInput) {
    try {
      const { simulation_id, visit, referral, sep, document } = data;

      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id: simulation_id });
      const patient_id = patient.id;

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);
      const documentRepo = AppDataSource.getRepository(DocumentPatient);

      const visitData = visitRepo.create({ patient_id, ...visit });
      const referralData = referralRepo.create({ patient_id, ...referral });
      const sepData = sepRepo.create({ patient_id, ...sep });
      const documentData = documentRepo.create({ simulation_id, ...document });

      await visitRepo.save(visitData);
      await referralRepo.save(referralData);
      await sepRepo.save(sepData);
      await documentRepo.save(documentData);

      const datas = { visitData, referralData, sepData, documentData };

      return datas
    }
    catch (error) {
      return error;
    }
  }

  static async createAdmissionInpatient(data: CreateAdmissionInPatientInput) {
    const {
      simulation_id,
      inpatientRecord,
      responsiblePerson,
      healthInformation,
      valueBelief,
      privacyRequest,
      documentPatient,
    } = data;

    const inpatientRecordRepo = AppDataSource.getRepository(InpatientRecord);
    const responsiblePersonRepo = AppDataSource.getRepository(ResponsiblePerson);
    const healthInfoRepo = AppDataSource.getRepository(HealthInformationPatient);
    const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
    const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
    const documentPatientRepo = AppDataSource.getRepository(DocumentPatient);

    try {
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id: simulation_id });
      const patient_id = patient.id;

      const newInpatientRecord = inpatientRecordRepo.create({
        patient_id,
        ...inpatientRecord,
      });
      await inpatientRecordRepo.save(newInpatientRecord);

      const newResponsiblePerson = responsiblePersonRepo.create({
        patient_id,
        ...responsiblePerson,
      });
      await responsiblePersonRepo.save(newResponsiblePerson);

      let newHealthInfo = null;
      if (healthInformation) {
        newHealthInfo = healthInfoRepo.create({
          patient_id,
          ...healthInformation,
        });
        await healthInfoRepo.save(newHealthInfo);
      }

      let newValueBelief = null;
      if (valueBelief) {
        newValueBelief = valueBeliefRepo.create({
          patient_id,
          ...valueBelief,
        });
        await valueBeliefRepo.save(newValueBelief);
      }

      let newPrivacyRequest = null;
      if (privacyRequest) {
        newPrivacyRequest = privacyRequestRepo.create({
          patient_id,
          ...privacyRequest,
        });
        await privacyRequestRepo.save(newPrivacyRequest);
      }

      let newDocumentPatient = null;
      if (documentPatient) {
        newDocumentPatient = documentPatientRepo.create({
          simulation_id,
          ...documentPatient,
        });
        await documentPatientRepo.save(newDocumentPatient);
      }

      return {
        inpatientRecord: newInpatientRecord,
        responsiblePerson: newResponsiblePerson,
        healthInformation: newHealthInfo,
        valueBelief: newValueBelief,
        privacyRequest: newPrivacyRequest,
        documentPatient: newDocumentPatient,
      };
    } catch (error) {
      throw new Error(`Failed to create admission inpatient: ${error.message}`);
    }
  }


  static async createAdmissionIGDPatient(data: CreateAdmissionIGDPatientInput) {
    try {
      const { simulation_id, visitIGD, document } = data;
      const patientVisitIGDRepo = AppDataSource.getRepository(PatientVisitIGD);
      const documentPatientRepo = AppDataSource.getRepository(DocumentPatient);

      console.log("simulation_id:", simulation_id);
      console.log("visitIGD:", visitIGD);

      const visitIGDRecord = patientVisitIGDRepo.create({
        simulation_id: simulation_id,
        ...visitIGD,
      });

      const documentPatientRecord = documentPatientRepo.create({
        simulation_id: simulation_id,
        ...document,
      });
      await patientVisitIGDRepo.save(visitIGDRecord);
      await documentPatientRepo.save(documentPatientRecord);

      return {
        visitIGDRecord,
        documentPatientRecord,
      };
    } catch (error) {
      throw new Error(`Failed to create IGD admission: ${error.message}`);
    }
  }

  static async getPatient(simulation_id: number) {
    const patientRepo = AppDataSource.getRepository(Patient);
    const patientDetailRepo = AppDataSource.getRepository(PatientDetail);
    const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
    const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
    const healthInfoRepo = AppDataSource.getRepository(HealthInformationPatient);

    const patient = await patientRepo.findOneBy({ simulation_id });
    if (!patient) {
      throw new Error("Patient not found");
    }

    const patient_detail = await patientDetailRepo.findOneBy({ patient_id: patient.id });
    const value_belief = await valueBeliefRepo.findOneBy({ patient_id: patient.id });
    const privacy_request = await privacyRequestRepo.findOneBy({ patient_id: patient.id });
    const health_information_patients = await healthInfoRepo.findBy({ patient_id: patient.id });

    return {
      data: patient,
      patient_detail: patient_detail ?? null,
      value_belief: value_belief ?? null,
      privacy_request: privacy_request ?? null,
      healthInfo: health_information_patients ?? null,
    };
  }

  static async getAdmissionOutPatient(simulation_id: number) {
    try {
      const SimulationData = await AppDataSource.getRepository(Simulation).findOneOrFail({ where: { id: simulation_id } });

      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });
      const patient_detail = await AppDataSource.getRepository(PatientDetail).findOneByOrFail({ patient_id: patient.id });
      const visit = await AppDataSource.getRepository(PatientVisitData).findOneBy({ patient_id: patient.id });
      const referral = await AppDataSource.getRepository(PatientReferralData).findOneBy({ patient_id: patient.id });
      const sep = await AppDataSource.getRepository(SepData).findOneBy({ patient_id: patient.id });
      const document = await AppDataSource.getRepository(DocumentPatient).findOneBy({ simulation_id });

      const data_kunjungan = {
        ...visit,
        cara_pembayaran: SimulationData.payment_method,
        nomer_asuransi: patient_detail.insurance_number,
      };

      return {
        data_kunjungan,
        data_rujukan: referral,
        data_sep: sep,
        dokumen: document,
      };
    } catch (error) {
      throw new Error(`Failed to get admission data: ${error.message}`);
    }
  }

  static async getAdmissionInpatient(simulation_id: number) {
    try {
      const simulation_data = await AppDataSource.getRepository(Simulation).findOneOrFail({ where: { id: simulation_id } });
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id: simulation_id });
      const patient_detail = await AppDataSource.getRepository(PatientDetail).findOneByOrFail({ patient_id: patient.id });

      const inpatientRecord = await AppDataSource.getRepository(InpatientRecord).findOneByOrFail({ patient_id: patient.id });
      const responsiblePerson = await AppDataSource.getRepository(ResponsiblePerson).findOneByOrFail({ patient_id: patient.id });
      const health_information_patients = await AppDataSource.getRepository(HealthInformationPatient).findBy({ patient_id: patient.id });
      const value_belief = await AppDataSource.getRepository(ValueBelief).findOneByOrFail({ patient_id: patient.id });
      const privacy_request = await AppDataSource.getRepository(PrivacyRequest).findOneBy({ patient_id: patient.id });
      const documentData = await AppDataSource.getRepository(DocumentPatient).findOneByOrFail({ simulation_id: simulation_id });

      const data_rawat_inap = {
        ...inpatientRecord ?? null,
        cara_pembayaran: simulation_data.payment_method ?? null,
        nomer_asuransi: patient_detail.insurance_number ?? null,
      };


      return {
        data_rawat_inap: data_rawat_inap ?? null,
        penanggung_jawab: responsiblePerson ?? null,
        penerima_informasi_kesehatan: health_information_patients ?? null,
        nilai_dan_keyakinan: value_belief ?? null,
        permintaan_privasi: privacy_request ?? null,
        document: documentData ?? null
      };
    } catch (error) {
      throw new Error(`Failed to get admission data: ${error.message}`);
    }
  }

  static async getAdmissionIGD(simulation_id: number) {
    try {
      const simulation_data = await AppDataSource.getRepository(Simulation).findOneByOrFail({ id: simulation_id });

      const patientVisitIGD = await AppDataSource.getRepository(PatientVisitIGD).findOneByOrFail({ simulation_id: simulation_id });
      const documentData = await AppDataSource.getRepository(DocumentPatient).findOneByOrFail({ simulation_id: simulation_id });

      const data_kunjungan = {
        ...patientVisitIGD ?? null,
        cara_pembayaran: simulation_data.payment_method
      }

      return {
        data_kunjungan,
        document: documentData ?? null
      };
    } catch (error) {
      throw new Error(`Failed to get admission data: ${error.message}`);
    }
  }
}
