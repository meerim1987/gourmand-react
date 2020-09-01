import React, { useState } from 'react';
import { PageFrame } from '../Components/PageFrame';
import AddOnFormElement from '../Components/AddOnFormElement';
import { MyUploader } from '../Components/MyUploader';
import { useAuth } from '../utils/useAuth';
import { ADD_RECIPE, getUrl, RECIPE_UPLOAD } from '../constants/url';
import { Categories } from '../constants/data';

const categories = Object.keys(Categories);
const stringValidate = (val) => !!val;
const arrValidate = (val) => val.length > 0;
const DESC_MAX_CHARS = 400;

// Form fields data
const fields = {
  description: {
    value: '',
    error: 'Type the description!',
    validate: stringValidate,
  },
  recipeTitle: {
    value: '',
    error: 'Type the title!',
    validate: stringValidate,
  },
  ingredients: {
    value: [],
    error: 'Add at least one ingredient!',
    validate: arrValidate,
  },
  directions: {
    value: [],
    error: 'Add at least one direction!',
    validate: arrValidate,
  },
  files: {
    value: [],
    error: 'Upload minimum 4 pictures!',
    validate: (val) => val.length >= 4,
  },
  category: {
    value: [],
    error: 'Choose a category!',
    validate: arrValidate,
  },
};

const initFormVals = {};
const initFormErrors = {};

Object.keys(fields).forEach((key) => {
  initFormVals[key] = Array.isArray(fields[key].value) ? [...fields[key].value] : fields[key].value;
  initFormErrors[`${key}Error`] = false;
});

const RecipePostPage = () => {
  const [formValues, setFormValues] = useState(JSON.parse(JSON.stringify(initFormVals)));
  const [formErrors, setFormErrors] = useState(initFormErrors);
  const [uploader, uploaderReset] = useState(false);
  const [listReset, enableListReset] = useState(false);
  
  useAuth();

  const handleChange = ({ target: { name, value } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeDescription = ({ target: { name, value } }) => {
    if (value.length > DESC_MAX_CHARS) {
      value = value.substring(0, DESC_MAX_CHARS + 1);
      window.toaster.addMessage('Sorry, max limit is 400 chars!', 'error');
    }
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChangeCheckbox = ({ target: { name, value } }) => {
    let arr = formValues.category;

    if (event.target.checked) {
      arr.push(value);
    } else {
      arr = arr.filter((el) => el !== value);
    }
    setFormValues({ ...formValues, [name]: arr });
  };

  const handleMenuDirections = (items, id) => {
    setFormValues({ ...formValues, [id]: items });
  };

  const reset = () => {
    setFormValues(JSON.parse(JSON.stringify(initFormVals)));
    uploaderReset(true);
    enableListReset(true);
  };

  const listUpdate = (fileList) => {
    setFormValues({ ...formValues, files: [...fileList] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    uploaderReset(false);
    enableListReset(false);
    let errorFound = false;
    let stateToUpdate = {};

    Object.keys(fields).forEach((key) => {
      stateToUpdate[`${key}Error`] = !fields[key].validate(formValues[key]);

      if (stateToUpdate[`${key}Error`]) {
        errorFound = true;
        window.toaster.addMessage(fields[key].error, 'error');
      }
    });
    setFormErrors({ ...formErrors, ...stateToUpdate });

    if (errorFound) {
      return;
    }
    console.log('Sending data to server...');
    const dataToSend = {
      title: formValues.recipeTitle,
      description: formValues.description,
      directions: formValues.directions,
      ingredients: formValues.ingredients,
      category: formValues.category,
    };

    const rawResponse = await fetch(getUrl(ADD_RECIPE), {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
      credentials: 'include',
    });

    try {
      const response = await rawResponse.json();
      if (response.success) {
        window.toaster.addMessage('Recipe was successfully submitted!', 'info');
        reset();
      } else {
        window.toaster.addMessage('Server error', 'error');
      }
    } catch (e) {
      console.error(e);
      window.toaster.addMessage('Server returned undexpected response...', 'error');
    }
  };

  return (
    <PageFrame>
      <div className="recipe-post-field-wrap ingredients">
        <section className="recipe-post-field">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="title">Publish your recipe</legend>

              <div className="recipe-title-wrap">
                <label htmlFor="recipe-title">
                  Title of the dish
                  <input
                    type="text"
                    id="recipe-title"
                    value={formValues.recipeTitle}
                    onChange={handleChange}
                    name="recipeTitle"
                    className={formErrors.recipeTitleError ? 'error-active' : ''}
                    placeholder="Type title here..."
                    title="Title"
                  />
                </label>
              </div>

              <div className="recipe-info-wrap">
                <label htmlFor="recipe-info">
                  General information
                  <textarea
                    id="recipe-info"
                    cols="35"
                    rows="5"
                    value={formValues.description}
                    onChange={handleChangeDescription}
                    name="description"
                    className={formErrors.descriptionError ? 'error-active' : ''}
                    placeholder="Type general information here..."
                  />
                </label>
              </div>

              <div
                className={`category-select 
                  ${formErrors.categoryError ? 'error-active' : ''}`}
              >
                <p>Select category</p>
                {categories.map((category, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name="category"
                        onChange={(e) => handleChangeCheckbox(e)}
                        value={category}
                        checked={formValues.category.includes(category)}
                      />
                      &nbsp;
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
              <MyUploader
                label={'Upload images'}
                onFileListUpdate={(fileList) => listUpdate(fileList)}
                color={formErrors.filesError ? '#ff0000' : '#736458'}
                makeFilesEmpty={uploader}
                inputName={'imageList[]'}
                url={getUrl(RECIPE_UPLOAD)}
              />
              <div className="ingredients-wrap">
                <label htmlFor="ingredients-field">Ingredients</label>
                <br />
                <AddOnFormElement
                  makeListEmpty={listReset}
                  onAddOnFormElement={handleMenuDirections}
                  id="ingredients"
                  name="ingredients"
                  placeholder="Type ingredients here..."
                  class={formErrors.ingredientsError ? 'error-active' : ''}
                />
              </div>
              <div className="directions-wrap">
                <label htmlFor="directions-field">Directions</label>
                <br />
                <AddOnFormElement
                  makeListEmpty={listReset}
                  onAddOnFormElement={handleMenuDirections}
                  id="directions"
                  name="directions"
                  placeholder="Type directions here..."
                  class={formErrors.directionsError ? 'error-active' : ''}
                />
              </div>
              <input className="submit-field" type="submit" value="Publish" />
            </fieldset>
          </form>
        </section>
      </div>
    </PageFrame>
  );
};

export default RecipePostPage;
