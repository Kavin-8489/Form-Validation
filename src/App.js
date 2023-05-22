import './App.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));
function App() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    result: ""
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClick = (e) => {
    e.preventDefault()
    setValues({ ...values, result: strongPasswordChecker(values.password, 6, 20, 2) });
  }
  const strongPasswordChecker = (val, minL, maxL, max) => {

    // For each repeated character 2 repetitions are ignored.
    const repetition = new RegExp(`(.)\\1{0,${max}}(?=\\1{${max}})`, 'g');

    //list where the each item represents a required change.
    const changes = (val.match(repetition) || []).map(s => s.length).sort((a, b) => b - a);

    //discard the changes that require the fewest removals first.
    let toRemove = val.length - maxL;
    while (changes.at(-1) <= toRemove) {
      toRemove -= changes.pop();
    }

    //Final Output 
    const numChanges = Math.max(
      changes.length, !/[a-z]/.test(val) + !/[A-Z]/.test(val) + !/[0-9]/.test(val));
    return Math.max(minL - val.length, numChanges + Math.max(0, val.length - maxL));
  };
  return (
    <div className="App">
      <div className='App-header'>

        <Card className={classes.root}>
          <h4 style={{ margin: "12px 0px 0px 0px" }}>
            FORM VALIDATION
          </h4>
          <CardContent>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />

            </FormControl>

          </CardContent>
          <CardActions style={{ padding: '0 0 24px 24px' }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Verify
            </Button>
          </CardActions>
        </Card>
        <p>OUTPUT : {values.result}</p>
      </div>

    </div>
  );
}

export default App;
