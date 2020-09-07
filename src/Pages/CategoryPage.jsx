import React, { useContext } from 'react';
import { PageFrame } from '../Components/PageFrame';
import { Loader } from '../Components/Loader';
import { Categories } from '../constants/data';
import { RecipeTile } from '../Components/RecipeTile';
import Select from 'react-select';
import { CloudTag } from '../Components/CloudTag';
import { SubscribeUser } from '../Components/SubscribeUser';
import { SubscribeNotUser } from '../Components/SubscribeNotUser';
import { useFetch } from '../utils/useFetch';
import { CATEGORY, PARAM_CATEGORY, replaceParams } from '../constants/routes';
import { CATEGORY_INFO } from '../constants/url';
import { AuthContext } from '../Application';

let options = Object.keys(Categories).map((ctg) => ({
  value: ctg,
  label: Categories[ctg].label,
}));

options = options.sort(function (a, b) {
  let nameA = a.label.toUpperCase();
  let nameB = b.label.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
});

const CategoryPage = (props) => {
  const ctgTitle = props.match.params.category ? props.match.params.category : options[0].value;
  const validCategory = Object.keys(Categories).includes(ctgTitle.trim());

  const handleChange = (selectedOption) => {
    props.history.push(replaceParams(CATEGORY, new Map([[PARAM_CATEGORY, selectedOption.value]])));
  };

  const { data: categoryData, fetching } = useFetch(
    validCategory ? replaceParams(CATEGORY_INFO, new Map([[PARAM_CATEGORY, ctgTitle]])) : null
  );
  const {userData} = useContext(AuthContext);

  return (
    <PageFrame>
      {!validCategory && <div>CATEGORY NOT FOUND</div>}
      {fetching ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <React.Fragment>
          <div>
            {categoryData && (
              <React.Fragment>
                <div>
                  <div className="category-description-wrap">
                    <div className="category-innerwrap">
                      <div className="ctg-title-wrap">
                        <h2 className="article-title">
                          {ctgTitle !== 'different' && categoryData.length > 0 ? ctgTitle + 's' : ctgTitle}
                        </h2>
                      </div>
                      <Select
                        value={options.filter((option) => option.value === ctgTitle)[0]}
                        onChange={handleChange}
                        options={options}
                        className={'select-ctg'}
                      />
                    </div>
                    <p />
                    <p>{Categories[ctgTitle].description}</p>
                  </div>
                  <div className="column-articles-ctgs">
                    {categoryData.map((el, index) => (
                      <RecipeTile data={el} key={index} />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div className="column-content-ctgs">
            {userData.isLoggedIn ? <SubscribeUser /> : <SubscribeNotUser />}
            <CloudTag />
          </div>
        </React.Fragment>
      )}
    </PageFrame>
  );
};

export default CategoryPage;
