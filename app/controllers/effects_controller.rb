class EffectsController < ApplicationController
  include CardContentHelper
  before_action :set_effect, only: [:update]

  def update
    adjust_confirmed_params
    @effect.update(effect_params)
    @fmea = @effect.failure_mode.function.fmea
    if params["live"] == "true"
      redirect_to "/playground"
      return
    end
    # redirect to the function where the effect was added
    redirect_to edit_fmea_path(@fmea, anchor: card_id(@effect.failure_mode.function))
  end

  def create
    @effect = Effect.new(effect_params)

    if @effect.save
      # redirect to the function where the effect was added
      redirect_to edit_fmea_path(@effect.failure_mode.function.fmea, anchor: card_id(@effect.failure_mode.function))
    else
      # redirect to fmea and show errors as a flash alert
      flash[:alert] = @effect.errors.full_messages
      redirect_to edit_fmea_path(@effect.failure_mode.function.fmea, anchor: card_id(@effect.failure_mode.function))
    end
  end

  def destroy
    @effect = Effect.find(params['id'])
    @failure_mode = @effect.failure_mode
    @effect.destroy
    redirect_to edit_fmea_path(@failure_mode.function.fmea, anchor: card_id(@failure_mode.function))
  end

  private

  def set_effect
    @effect = Effect.find(params[:id])
  end

  def effect_params
    params.require(:effect).permit(:description, :severity, :failure_mode, :failure_mode_id, :confirmed)
  end

  def adjust_confirmed_params
    if params["effect"]["confirmed"] == "0"
      params["effect"]["confirmed"] = false
    elsif params["effect"]["confirmed"] == "1"
      params["effect"]["confirmed"] = true
    end
  end
end
