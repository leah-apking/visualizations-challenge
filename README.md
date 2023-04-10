# visualizations-challenge

In this assignment, I build an interactive dashboard to explore the provided Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

![Screen Shot 2023-04-10 at 3 08 10 PM](https://user-images.githubusercontent.com/119013360/230976879-9348a235-2a46-427c-8ce7-813d5a23e09c.png)

### Dataset

The dataset included three separate sections: the ‘names’ section included a complete list of the identification numbers given to each individual, the ‘metadata’ section included demographic information for each participant, and the ‘samples’ section included the data collected on OTUs found. This data was then used to create a dashboard providing panel of demographic information, a bar graph showing the top 10 OTUs found in the individual, and a bubble chart displaying the quantity of each OTU in the individual. The dashboard also included a dropdown menu allowing users to select the ID for any individual in the dataset and the graphs would then update to show the information for the ID they selected.


### Setup & Demographics

I began this assignment by using the D3 library to fetch the JSON data from the provided URL and logging it to the console. Creating the dropdown menu required the ‘names’ section of the JSON, so retrieved that information and created a menu by appending each of the names in the dataset to a value in the menu and set the first name to a default starting point for the dashboard. For the demographics panel I set a function that pulled the metadata section of the JSON and filter for the data related to the selected ID. This information was appended in key value pairs to the demographics panel.

![image](https://user-images.githubusercontent.com/119013360/230974841-10b0d7fa-896b-4a5b-a8b0-7d9b3cbfcd56.png)

### Plotly Bar Graph & Bubble Chart

I used a single function to create both the bar graph and the bubble chart because both used data from the ‘samples’ section of the JSON. The samples data was filtered to match the selected ID, this full list was used to build the bubble chart, while the bar graph required data be sorted in descending order and sliced to include only the top ten OTUs. For the bar graph trace I used the sample values for x and mapped the OTU IDs to a string for the y; the OTU labels naming the bacteria were used for text. I then defined the rest of the layout and used Plotly to create the bar graph. Similarly, the bubble chart used the samples data but with the OTU IDs defining the x and color and the sample values defining the size y and size, the text again showed the labels. After defining the color scale, title, and layout I created the bubble chart using Plotly.

### Interactivity

After confirming my dashboard displayed correctly with my default selection, I set this selection up as the initial view of the dashboard, calling the demographics and create Plotly functions with the initial ID. I then went back to the dropdown menu and used D3 to allow the user to make a selection which, when changed, called an update Plotly function. This function then called the demographics and create Plotly functions again, but using the provided ID.
