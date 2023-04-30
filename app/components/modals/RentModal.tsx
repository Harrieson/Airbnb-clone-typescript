'use client'
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modals"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum steps {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5

}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(steps.CATEGORY);
    const {register, handleSubmit, setValue, watch, formState:{
        errors
    }, reset} = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount:1,
            imageSrc:'',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }
    
    const onBack = () => {
        setStep((value) => value - 1)
    };

    const onNext = () => {
        setStep((value) => value + 1)
    };

    const  actionLabel = useMemo(() => {
        if(step === steps.PRICE){
            return 'Create';
        }
        return 'Next';
    
    }, [step])
    const secondaryActionLabel = useMemo(() => {
        if (step === steps.CATEGORY) {
            return undefined;
        }

        return 'Back'
    }, [step])


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50ch] overflow-y-auto">
                {categories.map(({label, description,icon}) => (
                    <div key={label} className="col-start-1 cursor-pointer">
                        <CategoryInput
                        onClick={(category) => setCustomValue('category', category)}
                        selected={category === label}
                        label={label}
                        icon={icon} />
                    </div>
                ))}
            </div>
        </div>
    )
    return (
        <div>
            <Modal title="Airbnb your home" 
                   isOpen={rentModal.isOpen}
                   onClose={rentModal.onClose}
                   onSubmit={rentModal.onClose}
                   actionLabel={actionLabel}
                   body={bodyContent}
                   secondaryAction={step === steps.CATEGORY ? undefined : onBack} />
        </div>
    )
}

export default RentModal