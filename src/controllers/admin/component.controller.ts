import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { ComponentService, CreateAdmissionIGDPatientInput, CreateAdmissionInPatientInput, CreateAdmissionOutPatientInput, CreatePatientInput } from "../../services/ComponentService";

export class ComponentController {

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const type = req.params.type;

            if (type == "pendaftaran") {
                const patientData: CreatePatientInput = req.body
                const savedPatient = await ComponentService.createPatient(patientData);
                res.status(201).json({ message: "Patient successfully created" });
            } else if (type == "admission-rawat-jalan") {
                const admissionData: CreateAdmissionOutPatientInput = req.body
                const admission = await ComponentService.createAdmissionOutPatient(admissionData);
                res.status(201).json({ message: "Patient successfully created", data: admission });
            } else if (type == "admission-rawat-inap") {
                const admissionData: CreateAdmissionInPatientInput = req.body
                const admission = await ComponentService.createAdmissionInpatient(admissionData);
                res.status(201).json({ message: "Patient successfully created", data: admission });
            } else if (type == "admission-gawat-darurat") {
                const admissionDataIGD: CreateAdmissionIGDPatientInput = req.body
                console.log("admissionData", admissionDataIGD);
                const admission = await ComponentService.createAdmissionIGDPatient(admissionDataIGD);
                res.status(201).json({ message: "Data successfully created", data: admission });
            }
        }
        catch (e) {
            res.status(500).json({ message: "error", error: e.message });
        }
    }

    static async getOne(req: Request, res: Response): Promise<void> {
        try {
            const type = req.params.type;
            const simulation_id = parseInt(req.params.simulation_id);

            if (type == "pendaftaran") {
                const patientData = await ComponentService.getPatient(simulation_id)
                res.status(201).json({ data: patientData });
            } else if (type == "admission-rawat-jalan") {
                const admission = await ComponentService.getAdmissionOutPatient(simulation_id)
                res.status(201).json({ data: admission });
            } else if (type == "admission-rawat-inap") {
                const admission = await ComponentService.getAdmissionInpatient(simulation_id)
                res.status(201).json({ data: admission});
            } else if (type == "admission-gawat-darurat") {
                const admission = await ComponentService.getAdmissionIGD(simulation_id);
                res.status(201).json({ data: admission});
            }
        } catch (e) {

        }
    }
}