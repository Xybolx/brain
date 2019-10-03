import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, FormFeedback, Input } from 'reactstrap';
import IsValidEmailContext from '../../context/isValidEmailContext';
import IsValidPasswordContext from '../../context/isValidPasswordContext';
import IsValidUsernameContext from '../../context/isValidUsernameContext';
import UserContext from '../../context/userContext';
import Avatar from 'avataaars';
import API from '../../utils/API';
import InputLabel from './inputLabel';
import useForm from './useForm';
import Btn from '../button/btn';

const SignUpForm = () => {

    // state
    const [isSignedUp, setIsSignedUp] = useState(false);

    // context
    const { isValidEmail, setIsValidEmail } = useContext(IsValidEmailContext);
    const { isValidPassword, setIsValidPassword } = useContext(IsValidPasswordContext);
    const { isValidUsername, setIsValidUsername } = useContext(IsValidUsernameContext);
    const { setUser } = useContext(UserContext);

    // useInput
    const [values, handleChange, handleClearInputs] = useForm();

    // De-structuring values
    const { email, password, username, topType, accessoriesType, hairColor, facialHairType, facialHairColor, clotheType, clotheColor, graphicType, eyeType, eyebrowType, mouthType, skinColor } = values;

    // Get user and redirect function
    const getUser = () => {
        API.getUser()
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    };

    const redirect = () => {
        setTimeout(() => setIsSignedUp(true), 1000);
    };

    // Client-side validation
    useEffect(() => {
        const emailRegEx = /.+@.+\..+/;
        const emailMatch = emailRegEx.test(email);
        if (email && emailMatch) {
            setIsValidEmail(true);
        }
        if (!emailMatch) {
            setIsValidEmail(false);
        }
    }, [email, setIsValidEmail]);

    useEffect(() => {
        const passwordRegEx = /^(?=[0-9a-zA-Z#@$?]{6,}$).*/;
        const passwordMatch = passwordRegEx.test(password);
        if (password && passwordMatch) {
            setIsValidPassword(true);
        }
        if (!passwordMatch) {
            setIsValidPassword(false);
        }
    }, [password, setIsValidPassword]);

    useEffect(() => {
        const usernameRegEx = /^(?=[0-9a-zA-Z#@$?]{2,}$).*/;
        const usernameMatch = usernameRegEx.test(username);
        if (username && usernameMatch) {
            setIsValidUsername(true);
        }
        if (!usernameMatch) {
            setIsValidUsername(false);
        }
    }, [username, setIsValidUsername]);

    useEffect(() => {
        window.addEventListener("beforeunload", setIsValidPassword(false));
        return () => {
            window.removeEventListener("beforeunload", setIsValidPassword(false));
        };
    }, [setIsValidPassword]);

    useEffect(() => {
        window.addEventListener("beforeunload", setIsValidUsername(false));
        return () => {
            window.removeEventListener("beforeunload", setIsValidUsername(false));
        };
    }, [setIsValidUsername]);

    // handle submit
    const handleFormSubmit = ev => {
        ev.preventDefault();
        if (email && username && password) {
            API.signUp({
                email,
                username,
                password,
                topType,
                accessoriesType,
                hairColor,
                facialHairType,
                facialHairColor,
                clotheType,
                clotheColor,
                graphicType,
                eyeType,
                eyebrowType,
                mouthType,
                skinColor,
            })
                .then(res => handleClearInputs())
                .then(() => getUser())
                .then(() => redirect())
                .catch(err => console.log(err))
        };
    };

    // styles
    const facialStyle = {
        ...facialHairType
            !== 'Blank'
            ? { display: 'block', textAlign: 'left' }
            : { display: 'none', textAlign: 'left' }
    }

    const fabricStyle = {
        ...clotheType
            === 'BlazerShirt'
            ? { display: 'none', textAlign: 'left' }
            : { display: 'block', textAlign: 'left' },
    }

    const graphicStyle = {
        ...clotheType
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

    if (isSignedUp) {
        return <Redirect to="/reviews" />
    }

    return (
        <div style={{ textAlign: "center" }}>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                    <InputLabel
                        labelText="Email"
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
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
                    <InputLabel
                        labelText="Username"
                    />
                    <Input
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                        value={username}
                        valid={isValidUsername}
                        invalid={!isValidUsername}
                        onChange={handleChange}
                    />
                    <FormFeedback
                        style={
                            isValidUsername
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                        valid={isValidUsername}
                    >
                        Strange name...but okay!
                        </FormFeedback>
                    <FormFeedback
                        style={
                            !isValidUsername
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                    >
                        Minimum 2 characters!
                        </FormFeedback>
                </FormGroup>
                <FormGroup>
                    <InputLabel
                        labelText="Password"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
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
                    >
                        Valid password!
                        </FormFeedback>
                    <FormFeedback
                        style={
                            !isValidPassword
                                ? { display: 'block', marginLeft: 5 }
                                : { display: 'none' }
                        }
                    >
                        Minimum 6 characters!
                        </FormFeedback>
                </FormGroup>
                <Avatar
                    className="img-fluid"
                    style={{ width: '200px', height: '200px' }}
                    topType={topType}
                    accessoriesType={accessoriesType}
                    hairColor={hairColor}
                    facialHairType={facialHairType}
                    facialHairColor={facialHairColor}
                    clotheType={clotheType}
                    clotheColor={clotheColor}
                    graphicType={graphicType}
                    eyeType={eyeType}
                    eyebrowType={eyebrowType}
                    mouthType={mouthType}
                    skinColor={skinColor}
                />
                <div style={avatarSelectStyle}>
                    <FormGroup>
                        <InputLabel
                            labelText="Hair Type Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="topType"
                                value={topType}
                                onChange={handleChange}>
                                <option>Select Hair Type</option>
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
                        <InputLabel
                            labelText="Accessories Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="accessoriesType"
                                value={accessoriesType}
                                onChange={handleChange}>
                                <option>Select Accessory Type</option>
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
                        <InputLabel
                            labelText="Hair Color Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="hairColor"
                                value={hairColor}
                                onChange={handleChange}>
                                <option>Select Hair Color</option>
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
                        <InputLabel
                            labelText="Facial Hair Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="facialHairType"
                                value={facialHairType}
                                onChange={handleChange}>
                                <option>Select Facial Hair Type</option>
                                <option>BeardMedium</option>
                                <option>BeardLight</option>
                                <option>BeardMajestic</option>
                                <option>MoustacheFancy</option>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup style={facialStyle}>
                        <InputLabel
                            labelText="Facial Hair Color Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="facialHairColor"
                                value={facialHairColor}
                                onChange={handleChange}>
                                <option>Select Facial Hair Color</option>
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
                        <InputLabel
                            labelText="Clothing Type Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="clotheType"
                                value={clotheType}
                                onChange={handleChange}>
                                <option>Select Clothing Type</option>
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
                        <InputLabel
                            labelText="Fabric Color Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="clotheColor"
                                value={clotheColor}
                                onChange={handleChange}>
                                <option>Select Clothing Color</option>
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
                        <InputLabel
                            labelText="Graphic Type Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="graphicType"
                                value={graphicType}
                                onChange={handleChange}>
                                <option>Select Graphic Type</option>
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
                        <InputLabel
                            labelText="Eye Type Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="eyeType"
                                value={eyeType}
                                onChange={handleChange}>
                                <option>Default</option>
                                <option>Close</option>
                                <option>Cry</option>
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
                        <InputLabel
                            labelText="Eyebrow Type Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="eyebrowType"
                                value={eyebrowType}
                                onChange={handleChange}>
                                <option>Default</option>
                                <option>Angry</option>
                                <option>AngryNatural</option>
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
                        <InputLabel
                            labelText="Mouth Type Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="mouthType"
                                value={mouthType}
                                onChange={handleChange}>
                                <option>Default</option>
                                <option>Concerned</option>
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
                        <InputLabel
                            labelText="Skin Color Select"
                        />
                        <div>
                            <Input
                                type="select"
                                name="skinColor"
                                value={skinColor}
                                onChange={handleChange}>
                                <option>Select Skin Color</option>
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
                    <Btn
                        disabled={
                            !isValidEmail
                            || !isValidPassword
                            || !isValidUsername
                        }
                        type="submit"
                        color="dark"
                        size="md"
                        icon={<i className="fas fa-user-plus" />}
                        name="Sign Up"
                    >
                    </Btn>
                </div>
            </Form>
        </div>
    );
}


export default SignUpForm;