const {Plan, Patient, Surgery} = require('../models');

const getAllPlans = async (_req,res) => {
    const patientPlans = await Patient.findAll({
        attributes: { exclude: ['plan_id'] },
        include:{
            model: Plan,
            as:'plans',
        },
    });
    return res.status(200).json(patientPlans);
}

const getAllSurgeries = async (_req,res) => {
    const patientSurgeries = await Patient.findAll({
        include: { 
            model: Surgery, 
            as:'surgeries',
            through: { attributes: [] },
        },
    })
    return res.status(200).json(patientSurgeries);
}

const getByIdPlan = async (req,res) => {
    const {id} = req.params;
    const result = await Plan.findAll({
        where: { plan_id:id },
        include: { 
            model: Patient, 
            as:'patients',
            attributes: { exclude: ['plan_id'] }
        },  
    });
    if(!result) return res.status(404).json({ message: 'No plan found' })
    return res.status(200).json(result);
}

const create = async (req,res) => {
    const {fullname, plan_id } = req.body;
    if(!fullname || !plan_id) return res.status(404).json({ message: 'Invalid credencials'});
    await Patient.create({fullname, plan_id});
};

const getPatientsSurgeries = async (_req,res) => {
    const patientSurgeries = await Patient.findAll({
        include: { 
            model: Surgery, 
            as:'surgeries',
            through: { attributes: [] },
            attributes: { exclude: ['doctor'] }
        },
    })
    return res.status(200).json(patientSurgeries);
}

const getDoctorSurgeries = async (req,res) => {
    const {name} = req.params;
    const doctorSurgeries = await Surgery.findAll({
        where: {doctor: name},
        include: { 
            model: Patient, 
            as:'patients',
            through: { attributes: [] },
        },
    });
    if(!doctorSurgeries) return res.status(404).json({ message: 'Doctor name not found' })
    return res.status(200).json(doctorSurgeries);
}


module.exports = {
    getAllPlans,
    getAllSurgeries,
    getByIdPlan,
    create,
    getPatientsSurgeries,
    getDoctorSurgeries
};