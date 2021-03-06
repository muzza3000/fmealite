class FmeasController < ApplicationController
  include FmeaHelper
  before_action :set_fmea, only: [:edit, :update, :collaboration, :destroy, :download]

  def index
    @query = params[:search][:query] if params[:search].present?

    if @query.present?
      sql_query = " \
      fmeas.title ILIKE :query \
      OR risk_matrices.name ILIKE :query \
      "
      @fmeas = Fmea.joins(:risk_matrix).where(sql_query, query: "%#{@query}%")
      # @fmeas = Fmea.where("title ILIKE ?", "%#{@query}%")
    else
      @fmeas = Fmea.all
    end

    @fmea = Fmea.new
  end

  def edit
  end

  def create
    @fmea = Fmea.new(fmea_params)
    @fmea.fmea_type = "Design"
    if @fmea.save
      redirect_to(edit_fmea_path(@fmea))
    else
      @fmeas = Fmea.all
      render action: :index
    end
  end

  def update
    @fmea.update(fmea_params)
    redirect_to edit_fmea_path(@fmea)
  end

  def destroy
    @fmea.destroy
    redirect_to(fmeas_path)
  end

  def collaboration
    # check if fmea contains any failure modes

    if @fmea.failure_modes.present?

      # assign @query if query is provided
      @query = params[:failure_mode_id] if params[:failure_mode_id].present?

      # Check if the failure_mode exists
      if FailureMode.exists?(@query.to_i)
        # if yes: assign to failure_mode
        failure_mode = FailureMode.find(@query.to_i)
        # now check if failure_mode belongs to fmea
        if @fmea == failure_mode.function.fmea
          # if yes: assign show_instances so view renders in correct location
          @show_failure_mode = failure_mode
          @show_function = @show_failure_mode.function
        else
          # else: render the first function and failure mode
          @show_failure_mode = find_first_failure_mode(@fmea)
          @show_function = @show_failure_mode.function
        end
      else
        # render the first function and failure mode
        @show_failure_mode = find_first_failure_mode(@fmea)
        @show_function = @show_failure_mode.function
      end

    else
      flash[:alert] = "You must have at least 1 failure mode to use the collaboration mode"
      render :edit
    end
  end

  def download
    respond_to do |format|
      format.xlsx {
        response.headers[
          'Content-Disposition'
        ] = "attachment; filename=FMEA-#{@fmea.title}.xlsx"
      }
      format.html { render :index }
    end
  end

  private

  def set_fmea
    @fmea = Fmea.find(params[:id])
  end

  def fmea_params
    params.require(:fmea).permit(:title, :risk_matrix_id, :description, images: [])
  end

end
