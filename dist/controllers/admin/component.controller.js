"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentController = void 0;
const ComponentService_1 = require("../../services/ComponentService");
class ComponentController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.params.type;
                if (type == "pendaftaran") {
                    const patientData = req.body;
                    const savedPatient = yield ComponentService_1.ComponentService.createPatient(patientData);
                    res.status(201).json({ message: "Patient successfully created" });
                }
                else if (type == "admission-rawat-jalan") {
                    const admissionData = req.body;
                    const admission = yield ComponentService_1.ComponentService.createAdmissionOutPatient(admissionData);
                    res.status(201).json({ message: "Patient successfully created", data: admission });
                }
                else if (type == "admission-rawat-inap") {
                    const admissionData = req.body;
                    const admission = yield ComponentService_1.ComponentService.createAdmissionInpatient(admissionData);
                    res.status(201).json({ message: "Patient successfully created", data: admission });
                }
                else if (type == "admission-gawat-darurat") {
                    const admissionDataIGD = req.body;
                    console.log("admissionData", admissionDataIGD);
                    const admission = yield ComponentService_1.ComponentService.createAdmissionIGDPatient(admissionDataIGD);
                    res.status(201).json({ message: "Data successfully created", data: admission });
                }
            }
            catch (e) {
                res.status(500).json({ message: "error", error: e.message });
            }
        });
    }
    static getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const type = req.params.type;
                const simulation_id = parseInt(req.params.simulation_id);
                if (type == "pendaftaran") {
                    const patientData = yield ComponentService_1.ComponentService.getPatient(simulation_id);
                    res.status(201).json({ data: patientData });
                }
                else if (type == "admission-rawat-jalan") {
                    const admission = yield ComponentService_1.ComponentService.getAdmissionOutPatient(simulation_id);
                    res.status(201).json({ data: admission });
                }
            }
            catch (e) {
            }
        });
    }
}
exports.ComponentController = ComponentController;
//# sourceMappingURL=component.controller.js.map