import pandas as pd
import plotly.express as px
import streamlit as st

st.set_page_config(page_title="Carbon Footprints Reduced Last week",
                   page_icon=":bar_chart:",
                   layout="wide"
)

df=pd.read_csv("alldata.csv")


st.sidebar.header("Please Filter Here: ")
day=st.sidebar.multiselect(
    "Select the day:",
   options=df["Day"].unique(),
   default=df["Day"].unique()
)

food=st.sidebar.multiselect(
    "Select the food type:",
    options=df["Food"].unique(),
    default=df["Food"].unique()
)

region=st.multiselect(
    "Select the region:",
    options=df["Region"].unique(),
    default=df["Region"].unique()
)

df_selection = df.query(
    "Day == @day & Food == @food & Region == @region"

)



st.title(":bar_chart: CO2 Reduction Dashboard")
st.markdown("##")

total_co2_reduced = int(df_selection["Total Carbon Reductions"].sum())
avg_co2_reduced= round(total_co2_reduced/7)

left_column, middle_column, right_column = st.columns(3)
with left_column:
    st.subheader("Total Weekly Carbonfootprint Reduction")
    st.subheader(f"(kg CO₂e/kg) {total_co2_reduced}")
with middle_column:
     st.subheader("Average Daily Carbonfootprint Reduction")
     st.subheader(f"(kg CO₂e/kg) {avg_co2_reduced}")

st.markdown("---") 

group_by_days = (
     df_selection.groupby(by=["Day"]).sum()[["Total Carbon Reductions"]].sort_values(by="Total Carbon Reductions")
)
fig_day_carbon = px.bar(
       group_by_days,
       x="Total Carbon Reductions",
       y=group_by_days.index,
       orientation="h",
       title = "<b>Carbon Reductions Per Day</b>",
       color_discrete_sequence=["#0083B8"] * len(group_by_days),
       template="plotly_white",
)

fig_day_carbon.update_layout(
     plot_bgcolor="rgba(0,0,0,0)",
     xaxis=(dict(showgrid=False))
)


group_by_region = (
     df_selection.groupby(by=["Region"]).sum()[["Total Carbon Reductions"]].sort_values(by="Total Carbon Reductions")
)
fig_region_carbon = px.bar(
       group_by_region,
       x=group_by_region.index,
       y= "Total Carbon Reductions",
       orientation="v",
       title = "<b>Carbon Reductions Per Region</b>",
       color_discrete_sequence=["#0083B8"] * len(group_by_region),
       template="plotly_white",
)

fig_day_carbon.update_layout(
     plot_bgcolor="rgba(0,0,0,0)",
     xaxis=(dict(showgrid=False))
)

fig_region_carbon.update_layout(
     plot_bgcolor="rgba(0,0,0,0)",
     yaxis=(dict(showgrid=False))
)

left_column,right_column = st.columns(2)
left_column.plotly_chart(fig_day_carbon,use_container_width=True)
right_column.plotly_chart(fig_region_carbon,use_container_width=True)

hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)



