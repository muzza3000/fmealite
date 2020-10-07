module FmeaHelper
  def fmea_type_icon(fmea)
    #'Design', 'System' or 'Process'
    if fmea.fmea_type == "Proces"
      ('<i class="fas fa-tasks"></i>').html_safe
    elsif fmea.fmea_type == "System"
      ('<i class="fas fa-project-diagram"></i>').html_safe
    else
      ('<i class="fas fa-drafting-compass"></i>').html_safe
    end
  end
end