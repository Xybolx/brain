import React, { useContext } from 'react';
import Avatar from 'avataaars';
import API from '../utils/API';
import { useValidation } from './useForm';
import IsValidEmailContext from './isValidEmailContext';
import IsValidPasswordContext from './isValidPasswordContext';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const SignUpForm = () => {

    const { isValidEmail } = useContext(IsValidEmailContext);

    const { isValidPassword } = useContext(IsValidPasswordContext);

    const [values, handleChange] = useValidation({

        email: '',
        username: '',
        password: '',
        avatarStyle: 'Circle',
        topType: 'NoHair',
        accessoriesType: '',
        hairColor: 'Auburn',
        facialHairType: 'Blank',
        facialHairColor: '',
        clotheType: 'BlazerShirt',
        clotheColor: 'Black',
        graphicType: 'Bat',
        eyeType: 'Default',
        eyebrowType: 'Default',
        mouthType: 'Default',
        skinColor: 'Light',
    })

    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (values.email && values.username && values.password) {
            API.signUp({
                email: values.email,
                username: values.username,
                password: values.password,
                avatarStyle: values.avatarStyle,
                topType: values.topType,
                accessoriesType: values.accessoriesType,
                hairColor: values.hairColor,
                facialHairType: values.facialHairType,
                facialHairColor: values.facialHairColor,
                clotheType: values.clotheType,
                clotheColor: values.clotheColor,
                graphicType: values.graphicType,
                eyeType: values.eyeType,
                eyebrowType: values.eyebrowType,
                mouthType: values.mouthType,
                skinColor: values.skinColor
            });
        };
    };

    const facialStyle = {
        ...values.facialHairType
            !== 'Blank'
            ? { display: 'block', textAlign: 'left' }
            : { display: 'none', textAlign: 'left' }
    }

    const fabricStyle = {
        ...values.clotheType
            === 'BlazerShirt'
            ? { display: 'none', textAlign: 'left' }
            : { display: 'block', textAlign: 'left' },
    }

    const graphicStyle = {
        ...values.clotheType
            === 'GraphicShirt'
            ? { display: 'block', textAlign: 'left' }
            : { display: 'none', textAlign: 'left' }
    }

    const avatarSelectStyle = {
        marginTop: "20px",
        height: "250px",
        overflow: "scroll",
        overflowX: "hidden"
    }

    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <Label
                        style={{ marginLeft: 5 }}
                        htmlFor="emailInput">
                        Email
                            </Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={values.email}
                        valid={isValidEmail}
                        invalid={!isValidEmail}
                        onChange={handleChange}
                    />
                    <FormFeedback
                        style={
                            isValidEmail
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        valid={isValidEmail}
                        >Valid email!
                        </FormFeedback>
                    <FormFeedback
                        style={
                            !isValidEmail
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        >Enter a valid email!
                        </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label
                        style={{ marginLeft: 5 }}
                        htmlFor="usernameInput">
                        Username
                            </Label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={values.username}
                        valid={values.username}
                        invalid={!values.username}
                        onChange={handleChange}
                    />
                    <FormFeedback
                        style={
                            values.username
                                !== '' 
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        valid={values.username}
                        >Strange name...but okay!
                        </FormFeedback>
                    <FormFeedback
                        style={
                            !values.username
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        >Username is required!
                        </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label
                        style={{ marginLeft: 5 }}
                        htmlFor="passwordInput">
                        Password
                            </Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={values.password}
                        valid={isValidPassword}
                        invalid={!isValidPassword}
                        onChange={handleChange}
                    />
                    <FormFeedback
                        style={
                            isValidPassword
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        valid={isValidPassword}
                        >Valid password!
                        </FormFeedback>
                    <FormFeedback
                        style={
                            !isValidPassword 
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        >Minimum 6 characters!
                        </FormFeedback>
                </FormGroup>
                <Avatar
                    className="img-fluid"
                    style={{ width: '200px', height: '200px'}}
                    avatarStyle={values.avatarStyle}
                    topType={values.topType}
                    accessoriesType={values.accessoriesType}
                    hairColor={values.hairColor}
                    facialHairType={values.facialHairType}
                    facialHairColor={values.facialHairColor}
                    clotheType={values.clotheType}
                    clotheColor={values.clotheColor}
                    graphicType={values.graphicType}
                    eyeType={values.eyeType}
                    eyebrowType={values.eyebrowType}
                    mouthType={values.mouthType}
                    skinColor={values.skinColor}
                />
                <h2>Avatar Options</h2>
                <div style={avatarSelectStyle}>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Background Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="avatarStyle"
                                value={values.avatarStyle}
                                onChange={handleChange}>
                                <option>Circle</option>
                                <option>Transparent</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Top Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="topType"
                                value={values.topType}
                                onChange={handleChange}>
                                <option>NoHair</option>
                                <option>Eyepatch</option>
                                <option>LongHairBigHair</option>
                                <option>LongHairBob</option>
                                <option>LongHairBun</option>
                                <option>LongHairCurly</option>
                                <option>LongHairCurvy</option>
                                <option>LongHairDreads</option>
                                <option>LongHairFrida</option>
                                <option>LongHairFro</option>
                                <option>LongHairFroBand</option>
                                <option>LongHairNotTooLong</option>
                                <option>LongHairShavedSides</option>
                                <option>LongHairMiaWallace</option>
                                <option>LongHairStraight</option>
                                <option>LongHairStraight2</option>
                                <option>LongHairStraightStrand</option>
                                <option>ShortHairDreads01</option>
                                <option>ShortHairDreads02</option>
                                <option>ShortHairFrizzle</option>
                                <option>ShortHairShaggyMullet</option>
                                <option>ShortHairShortCurly</option>
                                <option>ShortHairShortFlat</option>
                                <option>ShortHairShortRound</option>
                                <option>ShortHairShortWaved</option>
                                <option>ShortHairSides</option>
                                <option>ShortHairTheCaesar</option>
                                <option>ShortHairTheCaesarSidePart</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Accessory Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="accessoriesType"
                                value={values.accessoriesType}
                                onChange={handleChange}>
                                <option>Blank</option>
                                <option>Kurt</option>
                                <option>Prescription01</option>
                                <option>Prescription02</option>
                                <option>Round</option>
                                <option>Sunglasses</option>
                                <option>Wayfarers</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Hair Color Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="hairColor"
                                value={values.hairColor}
                                onChange={handleChange}>
                                <option>Auburn</option>
                                <option>Black</option>
                                <option>Blonde</option>
                                <option>BlondeGolden</option>
                                <option>Brown</option>
                                <option>BrownDark</option>
                                <option>PastelPink</option>
                                <option>Platinum</option>
                                <option>Red</option>
                                <option>SilverGray</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Facial Hair Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="facialHairType"
                                value={values.facialHairType}
                                onChange={handleChange}>
                                <option>Blank</option>
                                <option>BeardMedium</option>
                                <option>BeardLight</option>
                                <option>BeardMajestic</option>
                                <option>MoustacheFancy</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup style={facialStyle}>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Facial Hair Color Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="facialHairColor"
                                value={values.facialHairColor}
                                onChange={handleChange}>
                                <option>Auburn</option>
                                <option>Black</option>
                                <option>Blonde</option>
                                <option>BlondeGolden</option>
                                <option>Brown</option>
                                <option>BrownDark</option>
                                <option>Platinum</option>
                                <option>Red</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Clothing Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="clotheType"
                                value={values.clotheType}
                                onChange={handleChange}>
                                <option>BlazerShirt</option>
                                <option>BlazerSweater</option>
                                <option>CollarSweater</option>
                                <option>GraphicShirt</option>
                                <option>Hoodie</option>
                                <option>Overall</option>
                                <option>ShirtCrewNeck</option>
                                <option>ShirtScoopNeck</option>
                                <option>ShirtVNeck</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup style={fabricStyle}>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Fabric Color Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="clotheColor"
                                value={values.clotheColor}
                                onChange={handleChange}>
                                <option></option>
                                <option>Black</option>
                                <option>Blue01</option>
                                <option>Blue02</option>
                                <option>Blue03</option>
                                <option>Gray01</option>
                                <option>Gray02</option>
                                <option>Heather</option>
                                <option>PastelBlue</option>
                                <option>PastelGreen</option>
                                <option>PastelOrange</option>
                                <option>PastelRed</option>
                                <option>PastelYellow</option>
                                <option>Pink</option>
                                <option>Red</option>
                                <option>White</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup style={graphicStyle}>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Graphic Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="graphicType"
                                value={values.graphicType}
                                onChange={handleChange}>
                                <option>Bat</option>
                                <option>Cumbia</option>
                                <option>Deer</option>
                                <option>Diamond</option>
                                <option>Hola</option>
                                <option>Pizza</option>
                                <option>Resist</option>
                                <option>Selena</option>
                                <option>Bear</option>
                                <option>SkullOutline</option>
                                <option>Skull</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Eye Type Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="eyeType"
                                value={values.eyeType}
                                onChange={handleChange}>
                                <option>Close</option>
                                <option>Cry</option>
                                <option>Default</option>
                                <option>Dizzy</option>
                                <option>EyeRoll</option>
                                <option>Happy</option>
                                <option>Hearts</option>
                                <option>Side</option>
                                <option>Surprise</option>
                                <option>Squint</option>
                                <option>Wink</option>
                                <option>WinkWacky</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Eyebrow Type Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="eyebrowType"
                                value={values.eyebrowType}
                                onChange={handleChange}>
                                <option>Angry</option>
                                <option>AngryNatural</option>
                                <option>Default</option>
                                <option>DefaultNatural</option>
                                <option>FlatNatural</option>
                                <option>RaisedExcited</option>
                                <option>RaisedExcitedNatural</option>
                                <option>SadConcerned</option>
                                <option>SadConcernedNatural</option>
                                <option>UnibrowNatural</option>
                                <option>UpDown</option>
                                <option>UpDownNatural</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Mouth Type Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="mouthType"
                                value={values.mouthType}
                                onChange={handleChange}>
                                <option>Concerned</option>
                                <option>Default</option>
                                <option>Disbelief</option>
                                <option>Eating</option>
                                <option>Grimace</option>
                                <option>Sad</option>
                                <option>ScreamOpen</option>
                                <option>Serious</option>
                                <option>Smile</option>
                                <option>Tongue</option>
                                <option>Twinkle</option>
                                <option>Vomit</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label
                            style={{ marginLeft: 5 }}>
                            Skin Color Select
                                </Label>
                        <div>
                            <Input
                                type="select"
                                name="skinColor"
                                value={values.skinColor}
                                onChange={handleChange}>
                                <option>Tanned</option>
                                <option>Yellow</option>
                                <option>Pale</option>
                                <option>Light</option>
                                <option>Brown</option>
                                <option>DarkBrown</option>
                                <option>Black</option>
                            </Input>
                        </div>
                    </FormGroup>
                </div>
                <div className="buttonDiv">
                    <Button
                        type="submit"
                        color="info"
                        size="md"
                        block>
                        Submit
                        </Button>
                </div>
            </Form>
        </div>
    );
}


export default SignUpForm;