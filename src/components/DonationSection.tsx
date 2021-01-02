import React, {FC} from "react"

type Props = {
    isShown: boolean
}
const DonationSection: FC<Props> = ({isShown}) => {

    return isShown ? <div className='donation'>
        <p style={{fontWeight: 'bold'}}>Понравился квест?</p>
        <p>Отблагодари меня отправив небольшую сумму.</p>
        <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="2BN66UWUW73W6"/>
            <input type="image"
                   src="https://common-stuff.s3.eu-central-1.amazonaws.com/paypal_button_cards.png"
                   name="submit"
                   title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button"
                   style={{border: 0}}
            />
            <input type="hidden" name="item_name" value="test"/>
            <img alt=""
                 src="https://www.paypal.com/en_LV/i/scr/pixel.gif" width="1" height="1"
                 style={{border: 0}}
            />
        </form>
    </div> : null
}

export default DonationSection;
