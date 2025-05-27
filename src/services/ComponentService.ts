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
import { Scenario } from "../entity/Scenario.entity";

export interface CreatePatientInput {
  patient: any;
  patient_detail?: PatientDetail;
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
      return null;
    }

    const patient_detail = await patientDetailRepo.findOneBy({ patient_id: patient.id });
    const value_belief = await valueBeliefRepo.findOneBy({ patient_id: patient.id });
    const privacy_request = await privacyRequestRepo.findOneBy({ patient_id: patient.id });
    const health_information_patients = await healthInfoRepo.findBy({ patient_id: patient.id });

    return {
      data: patient ?? null,
      patient_detail: patient_detail ?? null,
      value_belief: value_belief ?? null,
      privacy_request: privacy_request ?? null,
      healthInfo: health_information_patients ?? null,
    };
  }

  static async getAdmissionOutPatient(simulation_id: number) {
    try {
      const SimulationData = await AppDataSource.getRepository(Simulation).findOneOrFail({ where: { id: simulation_id } });

      const patient = await AppDataSource.getRepository(Patient).findOneBy({ simulation_id });
      const patient_detail = await AppDataSource.getRepository(PatientDetail).findOneBy({ patient_id: patient.id });
      const visit = await AppDataSource.getRepository(PatientVisitData).findOneBy({ patient_id: patient.id });
      const referral = await AppDataSource.getRepository(PatientReferralData).findOneBy({ patient_id: patient.id });
      const sep = await AppDataSource.getRepository(SepData).findOneBy({ patient_id: patient.id });
      const document = await AppDataSource.getRepository(DocumentPatient).findOneBy({ simulation_id });

      const data_kunjungan = {
        ...visit ?? null,
        cara_pembayaran: SimulationData.payment_method ?? null,
        nomer_asuransi: patient_detail.insurance_number ?? null,
      };

      return {
        data_kunjungan,
        data_rujukan: referral ?? null,
        data_sep: sep ?? null,
        dokumen: document ?? null,
      };
    } catch (error) {
      throw new Error(`Failed to get admission data: ${error.message}`);
    }
  }

  static async getAdmissionInpatient(simulation_id: number) {
    try {
      const simulation_data = await AppDataSource.getRepository(Simulation).findOneOrFail({ where: { id: simulation_id } });
      const patient = await AppDataSource.getRepository(Patient).findOneBy({ simulation_id: simulation_id });
      const patient_detail = await AppDataSource.getRepository(PatientDetail).findOneBy({ patient_id: patient.id });

      const inpatientRecord = await AppDataSource.getRepository(InpatientRecord).findOneBy({ patient_id: patient.id });
      const responsiblePerson = await AppDataSource.getRepository(ResponsiblePerson).findOneBy({ patient_id: patient.id });
      const health_information_patients = await AppDataSource.getRepository(HealthInformationPatient).findBy({ patient_id: patient.id });
      const value_belief = await AppDataSource.getRepository(ValueBelief).findOneBy({ patient_id: patient.id });
      const privacy_request = await AppDataSource.getRepository(PrivacyRequest).findOneBy({ patient_id: patient.id });
      const documentData = await AppDataSource.getRepository(DocumentPatient).findOneBy({ simulation_id: simulation_id });

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

  static async updatePatient(scenario_id: number, data: CreatePatientInput) {
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
    const scenario = await AppDataSource.getRepository(Scenario).findOneByOrFail({id:scenario_id})

    const existingPatient = await patientRepo.findOneBy({ simulation_id:scenario.simulation_id });
    if (!existingPatient) {
      throw new Error("Patient not found for update.");
    }

    // Update patient core data
    await patientRepo.update({ simulation_id: scenario.simulation_id }, patient);

    // Update or create patient_detail
    if (patient_detail) {
      const existingDetail = await patientDetailRepo.findOneBy({ patient_id: existingPatient.id });
      if (existingDetail) {
        await patientDetailRepo.update({ patient_id: existingPatient.id }, patient_detail);
      } else {
        const newDetail = patientDetailRepo.create({
          ...patient_detail,
          patient_id: existingPatient.id,
        });
        await patientDetailRepo.save(newDetail);
      }
    }

    // Update or create value_belief
    if (value_belief?.value_belief) {
      const existingVB = await valueBeliefRepo.findOneBy({ patient_id: existingPatient.id });
      if (existingVB) {
        await valueBeliefRepo.update({ patient_id: existingPatient.id }, { value_belief: value_belief.value_belief });
      } else {
        const newVB = valueBeliefRepo.create({
          patient_id: existingPatient.id,
          value_belief: value_belief.value_belief,
        });
        await valueBeliefRepo.save(newVB);
      }
    }

    // Update or create privacy_request
    if (privacy_request?.privacy_request) {
      const existingPR = await privacyRequestRepo.findOneBy({ patient_id: existingPatient.id });
      if (existingPR) {
        await privacyRequestRepo.update({ patient_id: existingPatient.id }, { privacy_request: privacy_request.privacy_request });
      } else {
        const newPR = privacyRequestRepo.create({
          patient_id: existingPatient.id,
          privacy_request: privacy_request.privacy_request,
        });
        await privacyRequestRepo.save(newPR);
      }
    }

    // Replace all family members (HealthInformationPatient)
    if (Array.isArray(family_members)) {
      await healthInfoRepo.delete({ patient_id: existingPatient.id });
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

    const updatedPatient = await patientRepo.findOneBy({ simulation_id:scenario.simulation_id });
    const updatedDetail = await patientDetailRepo.findOneBy({ patient_id: patient.id });
    const updatedValueBelief = await valueBeliefRepo.findOneBy({ patient_id: patient.id });
    const updatedPrivacyRequest = await privacyRequestRepo.findOneBy({ patient_id: patient.id });
    const updatedFamilyMembers = await healthInfoRepo.find({
      where: { patient_id: patient.id },
      order: { id: "ASC" }
    });

    return {
      patient: updatedPatient,
      patient_detail: updatedDetail,
      value_belief: updatedValueBelief,
      privacy_request: updatedPrivacyRequest,
      family_members: updatedFamilyMembers,
    };
  }

  static async updateAdmissionOutPatient(simulation_id: number, data: CreateAdmissionOutPatientInput) {
    try {
      const { visit, referral, sep, document } = data;

      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });
      const patient_id = patient.id;

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);
      const documentRepo = AppDataSource.getRepository(DocumentPatient);

      await visitRepo.update({ patient_id: patient_id }, visit);
      await referralRepo.update({ patient_id: patient_id }, referral);
      await sepRepo.update({ patient_id: patient_id }, sep);
      await documentRepo.update({ simulation_id: simulation_id }, document);

      const updatedVisit = await visitRepo.findOneBy({ patient_id });
      const updatedReferral = await referralRepo.findOneBy({ patient_id });
      const updatedSEP = await sepRepo.findOneBy({ patient_id });
      const updatedDocument = await documentRepo.findOneBy({ simulation_id });

      return {
        message: "Admission outpatient data updated successfully.",
        visit: updatedVisit,
        referral: updatedReferral,
        sep: updatedSEP,
        document: updatedDocument,
      };
    } catch (error) {
      return error;
    }
  }

  static async updateAdmissionInpatient(simulation_id: number, data: CreateAdmissionInPatientInput) {
    const {
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
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id });
      const patient_id = patient.id;

      await inpatientRecordRepo.update({ patient_id: patient_id }, inpatientRecord);
      await responsiblePersonRepo.update({ patient_id: patient_id }, responsiblePerson);

      if (healthInformation) {
        await healthInfoRepo.update({ patient_id: patient_id }, healthInformation);
      }

      if (valueBelief) {
        await valueBeliefRepo.update({ patient_id: patient_id }, valueBelief);
      }

      if (privacyRequest) {
        await privacyRequestRepo.update({ patient_id: patient_id }, privacyRequest);
      }

      if (documentPatient) {
        await documentPatientRepo.update({ simulation_id: simulation_id }, documentPatient);
      }

      return {
        message: "Admission inpatient data updated successfully.",
        inpatientRecord: await inpatientRecordRepo.findOneBy({ patient_id }),
        responsiblePerson: await responsiblePersonRepo.findOneBy({ patient_id }),
        healthInformation: healthInformation ? await healthInfoRepo.findOneBy({ patient_id }) : null,
        valueBelief: valueBelief ? await valueBeliefRepo.findOneBy({ patient_id }) : null,
        privacyRequest: privacyRequest ? await privacyRequestRepo.findOneBy({ patient_id }) : null,
        documentPatient: documentPatient ? await documentPatientRepo.findOneBy({ simulation_id }) : null,
      };
    } catch (error) {
      throw new Error(`Failed to update admission inpatient: ${error.message}`);
    }
  }

  static async updateAdmissionIGDPatient(simulation_id: number, data: CreateAdmissionIGDPatientInput) {
    const { visitIGD, document } = data;

    const patientVisitIGDRepo = AppDataSource.getRepository(PatientVisitIGD);
    const documentPatientRepo = AppDataSource.getRepository(DocumentPatient);

    try {
      await patientVisitIGDRepo.update({ simulation_id: simulation_id }, visitIGD);
      await documentPatientRepo.update({ simulation_id: simulation_id }, document);

      const updatedVisitIGD = await patientVisitIGDRepo.findOneBy({ simulation_id });
      const updatedDocument = await documentPatientRepo.findOneBy({ simulation_id });

      return {
        message: "IGD admission data updated successfully.",
        visitIGD: updatedVisitIGD,
        document: updatedDocument,
      };
    } catch (error) {
      throw new Error(`Failed to update IGD admission: ${error.message}`);
    }
  }

  static async deletePatient(simulation_id: number) {
    try {
      const patient = AppDataSource.getRepository(Patient)
      await patient.delete({ simulation_id: simulation_id })
      return { message: "Patient and related records deleted successfully." };
    } catch (error) {
      throw new Error(`Failed to delete patient data: ${error.message}`);
    }
  }

  static async deleteAdmissionOutpatient(simulation_id: number) {
    try {
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id: simulation_id })

      const visitRepo = AppDataSource.getRepository(PatientVisitData);
      const referralRepo = AppDataSource.getRepository(PatientReferralData);
      const sepRepo = AppDataSource.getRepository(SepData);
      const documentRepo = AppDataSource.getRepository(DocumentPatient);

      await visitRepo.delete({ patient_id: patient.id })
      await referralRepo.delete({ patient_id: patient.id })
      await sepRepo.delete({ patient_id: patient.id })
      await documentRepo.delete({ simulation_id: simulation_id })

      return { message: "Admission Data is Succesfully deleted" }
    } catch (error) {
      throw new Error(`failed to delete admission data: ${error.message}`);
    }
  }

  static async deleteAdmissionInpatient(simulation_id: number) {
    try {
      const patient = await AppDataSource.getRepository(Patient).findOneByOrFail({ simulation_id: simulation_id })

      const inpatientRecordRepo = AppDataSource.getRepository(InpatientRecord);
      const responsiblePersonRepo = AppDataSource.getRepository(ResponsiblePerson);
      const healthInfoRepo = AppDataSource.getRepository(HealthInformationPatient);
      const valueBeliefRepo = AppDataSource.getRepository(ValueBelief);
      const privacyRequestRepo = AppDataSource.getRepository(PrivacyRequest);
      const documentPatientRepo = AppDataSource.getRepository(DocumentPatient);

      await inpatientRecordRepo.delete({ patient_id: patient.id })
      await responsiblePersonRepo.delete({ patient_id: patient.id })
      await healthInfoRepo.delete({ patient_id: patient.id })
      await valueBeliefRepo.delete({ patient_id: patient.id })
      await privacyRequestRepo.delete({ patient_id: patient.id })
      await documentPatientRepo.delete({ simulation_id: simulation_id })

      return { message: "Admission Data is Succesfully deleted" }
    } catch (error) {
      throw new Error(`failed to delete admission data: ${error.message}`);
    }
  }

  static async deleteAdmissionIGD(simulation_id: number) {
    try {
      const patientVisitIGDRepo = AppDataSource.getRepository(PatientVisitIGD);
      const documentPatientRepo = AppDataSource.getRepository(DocumentPatient);

      await patientVisitIGDRepo.delete({ simulation_id: simulation_id });
      await documentPatientRepo.delete({ simulation_id: simulation_id });

      return { message: "Admission Data is Succesfully deleted" }
    } catch (error) {
      throw new Error(`failed to delete admission data: ${error.message}`);
    }
  }
}
