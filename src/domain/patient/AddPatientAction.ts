import { AddPatientSchema } from "../../infrastructure/http/controllers/patient/AddPatientController";
import { PatientRepository } from "../../infrastructure/repositories/PatientRepository";
import { Action } from "../Action";

export class AddPatientAction extends Action {
    constructor(private patientRepository: PatientRepository) {
        super();
    }

    async execute(data: AddPatientSchema) {
        try {
            console.log("data", data);
            return await this.patientRepository.add(data);
        } catch (e) {
            throw new Error(e);
        }
    }
}
