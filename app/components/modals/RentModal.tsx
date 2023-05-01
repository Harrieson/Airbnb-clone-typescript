'use client'
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modals"
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

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
            playAreaCount: 0,
            imageSrc:'',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location')
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const playAreaCount = watch('playAreaCount');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location]);

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

    if (step === steps.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading  title="Where is your property located?" 
                            subtitle="Help guests find you more easily" />
                    <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
                    <Map center={location?.latlang} />
            </div>
        )
    }

    if (step === steps.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Share Some basic amenities in your Space"
                            subtitle="What amenities do you provide?" />
                <Counter title="Guests" 
                subtitle="How many guests do you host?"
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)} />
                <hr />
                <Counter title="Rooms" 
                subtitle="How many rooms do you have?"
                value={roomCount}
                onChange={(value) => setCustomValue('roomCount', value)} />
                <hr />
                <Counter title="Bathrooms" 
                subtitle="How many Bathrooms do you have?"
                value={bathroomCount}
                onChange={(value) => setCustomValue('bathroomCount', value)} />
                <hr />
                <Counter title="Play Area" 
                subtitle=""
                value={playAreaCount}
                onChange={(value) => setCustomValue('playAreaCount', value)} />
            </div>
        )
    }

    if(step === steps.IMAGES){
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading title="Add a Photo of your place" 
                            subtitle=" Show Guests What they'll get!" />
                            <ImageUpload />
            </div>
        )
    }
    return (
        <div>
            <Modal title="Airbnb your home" 
                   isOpen={rentModal.isOpen}
                   onClose={rentModal.onClose}
                   onSubmit={onNext}
                   actionLabel={actionLabel}
                   body={bodyContent}
                   secondaryActionLabel={secondaryActionLabel}
                   secondaryAction={step === steps.CATEGORY ? undefined : onBack} />
        </div>
    )
}

export default RentModal