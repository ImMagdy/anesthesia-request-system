import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchLists, submitRequest } from '../services/api';

const FormContext = createContext();

export const useForm = () => {
    return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        theaterCategory: '', // 'Main' | 'Other'
        theater: '',
        seniorName: '',
        isEmergency: false,

        // Step 2
        residentName: '',
        residencyYear: '',
        mobileNumber: '',

        // Step 3
        requestType: '',

        // Step 4
        requestDate: new Date().toISOString().split('T')[0],
        description: '',
        isAllDay: true,
        timeFrom: '',
        timeTo: '',
        destination: ''
    });

    const [lists, setLists] = useState({ theaters: [], seniors: [] });
    const [isLoadingLists, setIsLoadingLists] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);

    // Initial load of lists
    useEffect(() => {
        const loadLists = async () => {
            setIsLoadingLists(true);
            try {
                const data = await fetchLists();
                setLists(data);
            } catch (err) {
                console.error("Failed to load lists", err);
            } finally {
                setIsLoadingLists(false);
            }
        };
        loadLists();
    }, []);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);
    const goToStep = (stepNumber) => setStep(stepNumber);

    const submitForm = async () => {
        setIsSubmitting(true);
        setSubmissionError(null);
        try {
            const success = await submitRequest(formData);
            if (success) {
                setSubmissionSuccess(true);
            } else {
                setSubmissionError("Failed to submit request. Please try again.");
            }
        } catch (error) {
            setSubmissionError("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setStep(1);
        setFormData({
            theaterCategory: '',
            theater: '',
            seniorName: '',
            isEmergency: false,
            residentName: '',
            residencyYear: '',
            mobileNumber: '',
            requestType: '',
            requestDate: new Date().toISOString().split('T')[0],
            description: '',
            isAllDay: true,
            timeFrom: '',
            timeTo: '',
            destination: ''
        });
        setSubmissionSuccess(false);
        setSubmissionError(null);
    };

    const value = {
        step,
        formData,
        lists,
        isLoadingLists,
        isSubmitting,
        submissionSuccess,
        submissionError,
        updateFormData,
        nextStep,
        prevStep,
        goToStep,
        submitForm,
        resetForm
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};
